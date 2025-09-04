import { Outlet } from "react-router-dom";
import Navbar from "../Navber/Navbar";


export const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet /> {/* 👈 yaha normal pages render honge */}
    </>
  );
};
