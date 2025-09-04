import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import "../index.css";

export const AdminContacts = () => {
  const { tokenAuthorization, API} = useAuth();
  const [contacts, setContacts] = useState([]);

  // ✅ Fetch All Contacts
  const GetAllContact = async () => {
    try {
      const response = await fetch(`${API}/api/admin/contacts`, {
        method: "GET",
        headers: {
          Authorization: tokenAuthorization,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch contacts");
      }

      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.log("Error fetching Contact:", error);
    }
  };

  // ✅ Delete Contact Function
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?"))
      return;

    try {
      const response = await fetch(`${API}/api/admin/contacts/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: tokenAuthorization,
        },
      });

      // Remove from UI without reload
      const data = await response.json();
      console.log("users after delete", data);
      if (response.ok) {
        GetAllContact();
      }
    } catch (error) {
      console.log("Error deleting contact:", error);
    }
  };

  useEffect(() => {
    GetAllContact();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="admin-contacts-container">
      <h1 className="admin-contacts-title">📩 Admin Contacts</h1>

      {contacts.length === 0 ? (
        <p className="admin-contacts-empty">No contacts found</p>
      ) : (
        <div className="admin-contacts-table-wrapper">
          <table className="admin-contacts-table">
            <thead>
              <tr>
                <th>Sr.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((curr, index) => (
                <tr key={curr._id}>
                  <td>{index + 1}</td>
                  <td>{curr.username}</td>
                  <td>{curr.email}</td>
                  <td>{curr.message}</td>
                  <td>
                    <button
                      className="contact-delete-btn"
                      onClick={() => handleDelete(curr._id)}
                    >
                      ❌ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
