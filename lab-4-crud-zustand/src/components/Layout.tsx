import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="container max-w-full">
      <Header />
      <main className="max-w-2xl mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
