import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState("");
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const tokenAuthorization = `Bearer ${token}`;

  const API = import.meta.env.VITE_API_URL;

  // ✅ Token localStorage me save karne ka function
  const storeTokenInLs = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };
  
  // ✅ Login check
  const isLoggedIn = !!token;
  
  // ✅ Logout function
  const LogoutUser = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
  };

  // ✅ User authentication
  const userAuthentication = async () => {
    if (!token) {
      setIsLoading(false); // ✅ direct false kar do
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${API}/api/auth/user`, {
        method: "GET",
        headers: {
          Authorization: tokenAuthorization,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
      } else {
        setUser(null);
      }
      // console.log(user);
    } catch (error) {
      console.error("⚠️ Error fetching user data:", error);
      setUser(null);
    } finally {
      setIsLoading(false); // ✅ always false in the end
    }
  };


  const getServices = async () => {
    try {
      const response = await fetch(`${API}/api/service`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.msg);
        setServices(data.msg);
      }
    } catch (error) {
      console.log(`services fronend error: ${error}`);
    }
  };

  // ✅ Jab bhi token change hoga tab authentication chalega
  useEffect(() => {
    userAuthentication();
    getServices();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeTokenInLs,
        LogoutUser,
        user,
        services,
        tokenAuthorization,
        isLoading,
        API,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom Hook
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const AuthContextValue = useContext(AuthContext);
  if (!AuthContextValue) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return AuthContextValue;
};
