import { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const DefaultContactFormData = {
  username: "",
  email: "",
  message: "",
};

export const Contact = () => {
  const { user, isLoggedIn, API} = useAuth(); // ✅ isLoggedIn bhi le lo
  const [formData, setFormData] = useState(DefaultContactFormData);

  // ✅ Autofill only if user is logged in
  useEffect(() => {
    if (isLoggedIn && user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        message: "",
      });
    } else {
      // logout hone par form empty
      setFormData(DefaultContactFormData);
    }
  }, [user, isLoggedIn]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.username.length < 3) {
      toast.error("Username must be at least 3 characters");
      return;
    }
    if (formData.message.length < 10) {
      toast.error("Message must be at least 10 characters");
      return;
    }

    try {
      const response = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      if (response.ok) {
        toast.success(responseData.message);
        setFormData(DefaultContactFormData);
      } else {
        toast.error(responseData.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server not responding. Try again later.");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Contact Us</h2>
        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          value={formData.username}
          onChange={handleChange}
          required
          disabled={isLoggedIn} // ✅ login hone par readonly bana do
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={isLoggedIn} // ✅ login hone par readonly bana do
        />
        <textarea
          name="message"
          placeholder="Enter your message..."
          value={formData.message}
          onChange={handleChange}
          rows="4"
          required
        ></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};
