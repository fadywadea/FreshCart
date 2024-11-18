import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userContext } from "../../Context/UserContext";

export default function ProtectedRoute({ children }) {
  const { userToken } = useContext(userContext);

  if (userToken !== null) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
