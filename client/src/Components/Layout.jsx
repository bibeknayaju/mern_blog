import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function Layout() {
  return (
    // <div className="flex flex-col min-h-screen">
    <main>
      <NavBar />
      <Outlet />
      {/* </div> */}
    </main>
  );
}
