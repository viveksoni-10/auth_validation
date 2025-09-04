import { BrowserRouter, Routes, Route } from "react-router-dom"; // ✅ Add this
import { AdminLayout } from "./component/layouts/AdminLayout";
import { MainLayout } from "./component/layouts/MainLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/about";
import { AdminContacts } from "./pages/AdminContacts";
import { AdminUpdateUser } from "./pages/AdminUpdateUser";
import { AdminUsers } from "./pages/AdminUsers";
import Home from "./pages/home";
import { PageNotFound } from "./pages/PageNotFound";
import Service from "./pages/service";
import { Contact } from "./pages/Contact";
import Logout from "./pages/Logout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Normal routes inside MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Route>

        {/* Admin routes inside AdminLayout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<h3>Welcome Admin! 👋</h3>} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="users/:id/edit" element={<AdminUpdateUser />} />
          <Route path="contacts" element={<AdminContacts />} />
        </Route>

        {/* Not found */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
