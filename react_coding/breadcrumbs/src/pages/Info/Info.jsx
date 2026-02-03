import React from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import { Link } from "react-router-dom";

const Info = () => {
  return (
    <div>
      <h1>Info</h1>
      <div>
        <Link to="/info/users">
          <p>Users</p>
        </Link>
        <Link to="/info/items">
          <p>Items</p>
        </Link>
      </div>
    </div>
  );
};

export default Info;
