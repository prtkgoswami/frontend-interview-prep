import React from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";

const Header = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const renderNavLinks = (navLink, title) => {
    if (pathname === navLink) {
      return <p>{title}</p>;
    } else {
      return (
        <Link to={navLink}>
          <p style={{ color: "blue" }}>{title}</p>
        </Link>
      );
    }
  };

  return (
    <>
      <header
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ margin: 0 }}>Breadcrumbs</h1>
        <nav style={{ display: "flex", gap: "3rem" }}>
          {renderNavLinks("/", "Home")}
          {renderNavLinks("/info", "Info")}
          {renderNavLinks("/about", "About")}
        </nav>
      </header>
      <Breadcrumbs />
    </>
  );
};

export default Header;
