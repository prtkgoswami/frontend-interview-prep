import React from "react";
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const params = useParams();
  const { userId } = params;

  console.log(params);
  return (
    <div>
      <h1>UserDetails for {userId}</h1>
    </div>
  );
};

export default UserDetails;
