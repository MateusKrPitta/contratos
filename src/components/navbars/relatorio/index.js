import React, { useState, useEffect } from "react";
import ButtonComponent from "../../button";
import { useNavigate, useLocation } from "react-router-dom";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

const HeaderRelatorio = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const path = location.pathname.split("/cadastro/")[1];
    setActiveSection(path);
  }, [location]);

  const handleNavigation = (section) => {
    setActiveSection(section);
    switch (section) {
      case "lista-compra":
        navigate("/relatorio/lista-compra");
        break;

      default:
        console.warn(`Seção desconhecida: ${section}`);
        break;
    }
  };

  return (
    <div className="w-[100%] items-center justify-center flex flex-wrap lg:justify-start md: gap-1 ">
      <ButtonComponent
        id="elemento1"
        startIcon={<FormatListBulletedIcon fontSize="small" />}
        title="Lista de Compra"
        subtitle={"Lista de Compra"}
        buttonSize="large"
        onClick={() => handleNavigation("lista-compra")}
        isActive={activeSection === "lista-compra"}
        className={`w-[35%] sm:w-[50%] md:w-[40%] lg:w-[100%] ${
          activeSection === "lista-compra" ? "bg-[#2C5282] text-white" : ""
        }`}
      />
    </div>
  );
};

export default HeaderRelatorio;
