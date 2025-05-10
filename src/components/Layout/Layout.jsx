import { Outlet } from "react-router-dom";
import Header from "../AppBar/AppBar";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Toaster position="top-right" />
    </>
  );
};

export default Layout;
