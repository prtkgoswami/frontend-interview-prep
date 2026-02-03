import React from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { Link } from "react-router-dom";

const UsersInfo = () => {
  return (
    <div>
      <h1>UsersInfo</h1>
      <div>
        <ul>
          <li>
            <Link to="/info/users/123">User 123</Link>
          </li>
          <li>
            <Link to="/info/users/456">User 456</Link>
          </li>
          <li>
            <Link to="/info/users/789">User 789</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UsersInfo;
