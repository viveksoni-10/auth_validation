import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import "../index.css";

export const AdminUpdateUser = () => {
  const { id } = useParams();
  const { tokenAuthorization, API } = useAuth();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch single user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${API}/api/admin/users/${id}`, {
          method: "GET",
          headers: {
            Authorization: tokenAuthorization,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData({
          username: data.username || "",
          email: data.email || "",
          phone: data.phone || "",
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, tokenAuthorization, API]);

  // ✅ Handle input change
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // ✅ Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API}/api/admin/users/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: tokenAuthorization,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const data = await response.json();
      console.log("✅ Updated user:", data);

      alert("User updated successfully!");
      navigate("/admin/users");
    } catch (error) {
      alert(`❌ Error updating user: ${error.message}`);
    }
  };

  // ✅ UI render
  if (loading) return <p className="loading">Loading user data...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="updateuser-container">
      <h1 className="updateuser-title">Update User</h1>
      <form className="updateuser-form" onSubmit={handleSubmit}>
        <label className="updateuser-label">
          Name:
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
            className="updateuser-input"
            required
          />
        </label>
        <label className="updateuser-label">
          Email:
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="updateuser-input"
            required
          />
        </label>
        <label className="updateuser-label">
          Phone:
          <input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            className="updateuser-input"
            required
          />
        </label>
        <button type="submit" className="updateuser-btn">
          Update
        </button>
      </form>
    </div>
  );
};
