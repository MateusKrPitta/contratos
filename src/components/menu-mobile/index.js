import React, { useState } from "react";
import logoPaxVerde from "../../assets/png/contrato.png";
import { useNavigate } from "react-router-dom";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import {
  Article,
  ExitToApp,
  ProductionQuantityLimits,
} from "@mui/icons-material";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import { IconButton } from "@mui/material";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import BarChartIcon from "@mui/icons-material/BarChart";

const MenuMobile = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const tipoUsuario = sessionStorage.getItem("tipo");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavigate = (route) => {
    navigate(route);
    setMenuOpen(false);
  };

  return (
    <div
      className="w-full flex items-center justify-between p-4 z-30 md:flex lg:hidden relative"
      style={{ backgroundColor: "#2C5282" }}
    >
      <div className="w-10"></div>

      <div
        className="flex justify-center cursor-pointer flex-1"
        onClick={() => handleNavigate("/dashboard")}
      >
        <img
          src={logoPaxVerde}
          alt="Logo"
          title="Clique para acessar a Dashboard"
          className="w-20"
        />
      </div>

      <IconButton
        onClick={toggleMenu}
        style={{
          color: "#ffff",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderRadius: "8px",
          padding: "8px",
          marginRight: "-4px",
        }}
        className="hover:bg-white hover:bg-opacity-30 transition-all duration-200"
      >
        <MenuIcon fontSize="medium" />
      </IconButton>

      <div
        className={`
        absolute top-16 right-0 w-48 bg-white text-black rounded-md shadow-lg z-40
        transition-all duration-300 ease-in-out overflow-hidden
        ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
      `}
      >
        <div className="flex flex-col p-2">
          <button
            onClick={() => handleNavigate("/dashboard")}
            className="flex text-black items-center gap-2 p-2 hover:bg-gray-200 font-bold rounded-md transition-colors"
          >
            <DashboardIcon style={{ color: "#2C5282" }} fontSize="small" />{" "}
            Dashboard
          </button>

          <button
            onClick={() => handleNavigate("/estoque")}
            className="flex text-black items-center gap-2 p-2 hover:bg-gray-200 font-bold rounded-md transition-colors"
          >
            <ProductionQuantityLimits
              style={{ color: "#2C5282" }}
              fontSize="small"
            />{" "}
            Estoque
          </button>

          <button
            onClick={() => handleNavigate("/cadastro")}
            className="flex text-black items-center gap-2 p-2 hover:bg-gray-200 font-bold rounded-md transition-colors"
          >
            <Article style={{ color: "#2C5282" }} fontSize="small" /> Cadastro
          </button>

          <button
            onClick={() => handleNavigate("/")}
            className="flex text-black items-center gap-2 p-2 hover:bg-gray-200 font-bold rounded-md transition-colors"
          >
            <ExitToApp style={{ color: "#2C5282" }} fontSize="small" /> Sair
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuMobile;
