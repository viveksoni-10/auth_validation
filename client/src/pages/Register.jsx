import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

function Register() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLs, API } = useAuth(); // 👈 ab yeh sahi kaam karega

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const resData = await res.json();
      console.log("response from server:", resData);

      if (res.ok) {
        if (resData.token) storeTokenInLs(resData.token);
        toast.success("Registration successful!");
        navigate("/login");
      } else {
        if (resData.errors) {
          toast.success(resData.errors.join("\n")); // Zod validation errors
        } else if (resData.message) {
          toast.success(resData.message); // Backend error
        } else {
          toast.error("Registration failed. Please try again.");
        }
      }

    } catch (error) {
      console.log("register error:", error);
      toast.error("Server not responding. Try again later.");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Registration</h2>

        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          autoComplete="off"
          value={user.username}
          onChange={handleInput}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={user.email}
          onChange={handleInput}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={user.password}
          onChange={handleInput}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Enter Phone Number"
          value={user.phone}
          onChange={handleInput}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Register;
