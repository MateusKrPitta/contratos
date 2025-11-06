import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/png/contrato.png";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import CloseIcon from "@mui/icons-material/Close";
import BarChartIcon from "@mui/icons-material/BarChart";
import { Button, Drawer, IconButton, List } from "@mui/material";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import { Article } from "@mui/icons-material";
import ButtonComponent from "../../button";

const Navbar = ({ user }) => {
  const [activeRoute, setActiveRoute] = useState("");
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCadastroSubMenu, setShowCadastroSubMenu] = useState(false);

  const tipoUsuario = localStorage.getItem("tipo");
  const isUsuarioTipo3 = tipoUsuario === "3";

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user) {
      setUserData(user);
    } else {
      const storedUser = sessionStorage.getItem("user");
      if (storedUser) {
        try {
          setUserData(JSON.parse(storedUser));
        } catch (error) {
          console.error("Erro ao parsear user do localStorage:", error);
        }
      }
    }
  }, [user]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavigate = (route) => {
    navigate(route);
    localStorage.setItem("page", route);
    setActiveRoute(route);
  };

  useEffect(() => {
    const savedPage = localStorage.getItem("page");
    if (savedPage && savedPage !== activeRoute) {
      setActiveRoute(savedPage);
    }
  }, []);

  return (
    <div className="hidden sm:hidden md:hidden lg:block">
      <div className="lg:block hidden h-[100%]">
        <div
          className="transition-all w-54 h-screen bg-cover bg-no-repeat bg-center flex flex-col p-5"
          style={{
            borderRight: "1px solid #E2E8F0",
            background: "linear-gradient(180deg, #2C5282 0%, #3182CE 100%)",
          }}
        >
          <div className="flex items-center w-full gap-3 justify-center mb-6 mt-2">
            <div className="bg-white w-12 h-12 p-1 rounded-full shadow-lg flex items-center justify-center border border-blue-100">
              <img src={logo} className="w-8 h-8" alt="Logo" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-white text-sm font-bold">Sistema</h2>
              <p className="text-blue-100 text-xs font-bold">Contratos</p>
            </div>
          </div>

          <label className=" text-blue-100 font-bold text-xs mb-2 ">
            FUNÇÕES
          </label>
          <div className="flex flex-col gap-1 text-white overflow-hidden transition-all pt-1">
            <>
              <ButtonComponent
                id="elemento1"
                startIcon={<DashboardIcon fontSize="small" />}
                title="Dashboard"
                subtitle={"Dashboard"}
                buttonSize="large"
                onClick={() => handleNavigate("/dashboard")}
              />
              <ButtonComponent
                id="elemento1"
                startIcon={<Article fontSize="small" />}
                title="Contratos"
                subtitle={"Contratos"}
                buttonSize="large"
                onClick={() => handleNavigate("/contratos")}
                style={{
                  margin: "4px 0",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "#EDF2F7",
                    color: "#2C5282",
                  },
                }}
              />
            </>

            <label className="text-xs mt-2 text-blue-100 font-bold ">
              CONFIGURAÇÕES
            </label>
            <div className="flex flex-col gap-1 text-white overflow-hidden transition-all pt-1">
              <ButtonComponent
                id="elemento1"
                startIcon={<MiscellaneousServicesIcon fontSize="small" />}
                title="Cadastro"
                subtitle={"Cadastro"}
                buttonSize="large"
                onClick={() => handleNavigate("/cadastro")}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden flex w-full h-[60px] bg-gradient-to-r from-blue-600 to-blue-700 fixed top-0 left-0 z-10 shadow-md">
        {user ? (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <IconButton onClick={toggleMenu} style={{ color: "white" }}>
              <MenuIcon />
            </IconButton>
          </div>
        ) : (
          <></>
        )}
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={logo}
            alt="Logo"
            title="Clique para acessar a Dashboard"
            className="w-10 h-10"
          />
          <span className="ml-2 text-white font-bold">Sistema Contratos</span>
        </div>
        <Drawer anchor="left" open={menuOpen} onClose={toggleMenu}>
          <div className="w-64 h-full bg-gray-50">
            <div className="flex justify-between items-center px-4 py-3 border-b bg-blue-600 text-white">
              <h2 className="text-lg font-bold">Menu</h2>
              <IconButton onClick={toggleMenu} style={{ color: "white" }}>
                <CloseIcon />
              </IconButton>
            </div>

            <List className="py-2">
              {!isUsuarioTipo3 && (
                <Button
                  fullWidth
                  onClick={() => {
                    handleNavigate("/dashboard");
                    toggleMenu();
                  }}
                  startIcon={<DashboardIcon fontSize="small" />}
                  className="text-left"
                  title="Ir para Pagamentos"
                  sx={{
                    justifyContent: "flex-start",
                    padding: "12px 16px",
                    textTransform: "none",
                    color: "#2D3748",
                    fontSize: "14px",
                    fontWeight: activeRoute === "/dashboard" ? "600" : "400",
                    backgroundColor:
                      activeRoute === "/dashboard" ? "#EBF4FF" : "transparent",
                    "&:hover": {
                      backgroundColor: "#EBF4FF",
                    },
                  }}
                >
                  Dashboard
                </Button>
              )}

              {!isUsuarioTipo3 && (
                <div>
                  <Button
                    fullWidth
                    onClick={() => setShowCadastroSubMenu(!showCadastroSubMenu)}
                    startIcon={<MiscellaneousServicesIcon fontSize="small" />}
                    className="text-left"
                    title="Ir para Cadastro"
                    sx={{
                      justifyContent: "flex-start",
                      padding: "12px 16px",
                      textTransform: "none",
                      color: "#2D3748",
                      fontSize: "14px",
                      "&:hover": {
                        backgroundColor: "#EBF4FF",
                      },
                    }}
                  >
                    Cadastro
                  </Button>
                  {showCadastroSubMenu && (
                    <div className="bg-blue-50">
                      <Button
                        fullWidth
                        onClick={() => {
                          handleNavigate("/cadastro");
                          toggleMenu();
                        }}
                        startIcon={<PersonIcon fontSize="small" />}
                        className="text-left"
                        title="Ir para Usuário"
                        sx={{
                          justifyContent: "flex-start",
                          padding: "10px 50px",
                          textTransform: "none",
                          color: "#4A5568",
                          fontSize: "13px",
                          backgroundColor:
                            activeRoute === "/cadastro"
                              ? "#EBF4FF"
                              : "transparent",
                          fontWeight:
                            activeRoute === "/cadastro" ? "600" : "400",
                          "&:hover": {
                            backgroundColor: "#EBF4FF",
                          },
                        }}
                      >
                        {JSON.parse(sessionStorage.getItem("user"))?.nome ||
                          "Usuário"}
                      </Button>
                      <Button
                        fullWidth
                        onClick={() => {
                          handleNavigate("/cadastro-unidade");
                          toggleMenu();
                        }}
                        startIcon={<LocationCityIcon fontSize="small" />}
                        className="text-left"
                        title="Ir para Unidade"
                        sx={{
                          justifyContent: "flex-start",
                          padding: "10px 50px",
                          textTransform: "none",
                          color: "#4A5568",
                          fontSize: "13px",
                          backgroundColor:
                            activeRoute === "/cadastro-unidade"
                              ? "#EBF4FF"
                              : "transparent",
                          fontWeight:
                            activeRoute === "/cadastro-unidade" ? "600" : "400",
                          "&:hover": {
                            backgroundColor: "#EBF4FF",
                          },
                        }}
                      >
                        Unidade
                      </Button>
                    </div>
                  )}
                </div>
              )}

              <Button
                fullWidth
                onClick={() => {
                  handleNavigate("/contratos");
                  toggleMenu();
                }}
                startIcon={<Article fontSize="small" />}
                className="text-left"
                title="Ir para Contratos"
                sx={{
                  justifyContent: "flex-start",
                  padding: "12px 16px",
                  textTransform: "none",
                  color: "#2D3748",
                  fontSize: "14px",
                  fontWeight: activeRoute === "/contratos" ? "600" : "400",
                  backgroundColor:
                    activeRoute === "/contratos" ? "#EBF4FF" : "transparent",
                  "&:hover": {
                    backgroundColor: "#EBF4FF",
                  },
                }}
              >
                Contratos
              </Button>

              {!isUsuarioTipo3 && (
                <>
                  <Button
                    fullWidth
                    onClick={() => {
                      handleNavigate("/relatorio");
                      toggleMenu();
                    }}
                    startIcon={<BarChartIcon fontSize="small" />}
                    className="text-left"
                    title="Ir para Relatorio"
                    sx={{
                      justifyContent: "flex-start",
                      padding: "12px 16px",
                      textTransform: "none",
                      color: "#2D3748",
                      fontSize: "14px",
                      fontWeight: activeRoute === "/relatorio" ? "600" : "400",
                      backgroundColor:
                        activeRoute === "/relatorio"
                          ? "#EBF4FF"
                          : "transparent",
                      "&:hover": {
                        backgroundColor: "#EBF4FF",
                      },
                    }}
                  >
                    Relatório
                  </Button>

                  <Button
                    fullWidth
                    onClick={() => {
                      handleNavigate("/cursos");
                      toggleMenu();
                    }}
                    startIcon={<VideoCameraFrontIcon fontSize="small" />}
                    className="text-left"
                    title="Ir para Cursos"
                    sx={{
                      justifyContent: "flex-start",
                      padding: "12px 16px",
                      textTransform: "none",
                      color: "#2D3748",
                      fontSize: "14px",
                      fontWeight: activeRoute === "/cursos" ? "600" : "400",
                      backgroundColor:
                        activeRoute === "/cursos" ? "#EBF4FF" : "transparent",
                      "&:hover": {
                        backgroundColor: "#EBF4FF",
                      },
                    }}
                  >
                    Cursos
                  </Button>
                </>
              )}
            </List>
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default Navbar;
