import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 useNavigate import
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";


function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  
  const { storeTokenInLs, API} = useAuth();
  const URL = `${API}/api/auth/login`;

  const navigate = useNavigate(); // 👈 useNavigate hook

  const handleLogin = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  
  const LoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      
      const resData = await res.json();
      console.log(resData);

      if (res.ok) {
        storeTokenInLs(resData.token); // ✅ token save
        toast.success("Login successful");

        setUser({ email: "", password: "" });

        // ✅ Redirect based on role
        if (resData.user?.isAdmin) {
          navigate("/admin"); // admin -> admin page
        } else {
          navigate("/"); // normal user -> home page
        }
      } else {
        toast.error(resData.message);
      }
    } catch (error) {
      console.log("login", error);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={LoginSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={user.email}
          onChange={handleLogin}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={user.password}
          onChange={handleLogin}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
