import React, { useState, useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ButtonComponent from "../../button";
import { useNavigate, useLocation } from "react-router-dom";
import AssignmentIcon from "@mui/icons-material/Assignment";

const HeaderCadastro = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("");
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const savedPermissions = sessionStorage.getItem("permissoes_id");
    if (savedPermissions) {
      try {
        const parsedPermissions = JSON.parse(savedPermissions);
        setPermissions(parsedPermissions);
      } catch (error) {
        console.error("Erro ao parsear permissões:", error);
      }
    }

    const path = location.pathname.split("/cadastro/")[1];
    setActiveSection(path);
  }, [location]);

  const handleNavigation = (section) => {
    setActiveSection(section);
    switch (section) {
      case "usuario":
        navigate("/cadastro/usuario");
        break;
      case "cliente":
        navigate("/cadastro/cliente");
        break;
      case "template":
        navigate("/cadastro/template");
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
        startIcon={<AccountCircleIcon fontSize="small" />}
        title="Usuário"
        subtitle={"Usuário"}
        buttonSize="large"
        onClick={() => handleNavigation("usuario")}
        isActive={activeSection === "usuario"}
        className={`w-[37%] sm:w-[50%] md:w-[40%] lg:w-[100%] `}
      />

      <ButtonComponent
        id="elemento3"
        startIcon={<AssignmentIcon fontSize="small" />}
        title="Cliente"
        subtitle={"Cliente"}
        buttonSize="large"
        onClick={() => handleNavigation("cliente")}
        isActive={activeSection === "cliente"}
        className={`w-[37%] sm:w-[50%] md:w-[40%] lg:w-[100%] `}
      />
    </div>
  );
};

export default HeaderCadastro;
