import React from "react";
import { useLocation, Link } from "react-router-dom";

const BREADCRUMB_NAMES = {
  "/": "Home",
  "/info": "Information",
  "/info/users": "User Directory",
  "/info/items": "Inventory Items",
  "/about": "About Us",
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const pathTokens = pathname
    .split("/")
    .slice(1)
    .filter((token) => token);

  const renderLabel = (path) => {
    if (path in BREADCRUMB_NAMES) {
      return BREADCRUMB_NAMES[path];
    }

    if (path.match(/\/info\/users\/\d+/)) {
      return "User Details";
    }
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 70rem 1fr" }}>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          gridColumnStart: 2,
        }}
      >
        <Link to="/" style={{ color: "blue" }}>
          {renderLabel("/")}
        </Link>
        {pathTokens.length > 0 && <p style={{ color: "lightgrey" }}>▶</p>}
        {pathTokens.length > 0 &&
          pathTokens.slice(0, -1).map((token, i) => (
            <div
              key={token}
              style={{ display: "flex", gap: "1rem", alignItems: "center" }}
            >
              <Link
                to={`/${pathTokens.slice(0, i + 1).join("/")}`}
                style={{ color: "blue" }}
              >
                {renderLabel(`/${pathTokens.slice(0, i + 1).join("/")}`)}
              </Link>
              <p style={{ color: "lightgrey" }}>▶</p>
            </div>
          ))}
        {pathname !== "/" && (
          <p style={{ color: "black" }}>
            {renderLabel(`/${pathTokens.join("/")}`)}
          </p>
        )}
      </div>
    </div>
  );
};

export default Breadcrumbs;
