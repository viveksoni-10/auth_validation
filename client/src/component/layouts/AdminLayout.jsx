import { NavLink, Outlet } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdContactEmergency } from "react-icons/md";
import { GrServices } from "react-icons/gr";
import { useAuth } from "../../store/auth";
import "./AdminLayout.css";

export const AdminLayout = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <p>Loading....</p>;
  }

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h2>Admin</h2>
        <ul className="admin-menu">
          <li>
            <NavLink to="/admin/users" className="admin-link">
              <FaUser />
              <span>Users</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/contacts" className="admin-link">
              <MdContactEmergency />
              <span>Contacts</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/services" className="admin-link">
              <GrServices />
              <span>Services</span>
            </NavLink>
          </li>
        </ul>
      </aside>

      {/* Content */}
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};
