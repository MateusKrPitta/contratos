import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import CustomToast from "../components/toast";

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      CustomToast({
        type: "warning",
        message: "Acesso negado. Faça login para acessar essa página!",
      });
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
