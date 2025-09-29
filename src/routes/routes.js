import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../pages/login";
import Dashboard from "../pages/dashboard";
import Cadastro from "../pages/cadastro";
import Usuario from "../pages/cadastro/usuarios";
import Cliente from "../pages/cadastro/clientes";
import Template from "../pages/cadastro/template";
import Contratos from "../pages/contratos";
import ProtectedRoute from "../auth";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/contratos"
        element={
          <ProtectedRoute>
            <Contratos />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cadastro"
        element={
          <ProtectedRoute>
            <Cadastro />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cadastro/usuario"
        element={
          <ProtectedRoute>
            <Usuario />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cadastro/cliente"
        element={
          <ProtectedRoute>
            <Cliente />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cadastro/template"
        element={
          <ProtectedRoute>
            <Template />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
