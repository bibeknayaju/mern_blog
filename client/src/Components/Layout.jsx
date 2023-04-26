import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function Layout() {
  return (
    <div className="py-4 px-8 flex flex-col min-h-screen">
      <NavBar />
      <Outlet />
    </div>
  );
}
