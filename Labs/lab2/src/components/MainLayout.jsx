import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

function MainLayout({ searchQuery, onSearchChange }) {
  return (
    <>
      <Header searchQuery={searchQuery} onSearchChange={onSearchChange} />
      <Outlet />
      <Footer avatar="/images/orange_juice.webp" name="thinhph" email="hungthinh16072005@gmail.com" />
    </>
  );
}

export default MainLayout;