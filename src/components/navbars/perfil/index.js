import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  Box,
  Menu,
  MenuItem,
  Typography,
  IconButton,
  CircularProgress,
  Badge,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Title from "../../title";
import ButtonComponent from "../../button";
import LogoutIcon from "@mui/icons-material/Logout";
import ClearIcon from "@mui/icons-material/Clear";
import CustomToast from "../../toast";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import "./perfil.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
};

const HeaderPerfil = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [openLogoutConfirm, setOpenLogoutConfirm] = useState(false);
  const [userName, setUserName] = useState("");

  const [loading, setLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Nova mensagem",
      content: "Você tem uma nova mensagem não lida",
      read: false,
      date: "2023-05-15 10:30",
    },
    {
      id: 2,
      title: "Atualização do sistema",
      content: "Uma nova atualização está disponível",
      read: true,
      date: "2023-05-14 15:45",
    },
  ]);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleOpenLogoutConfirm = () => setOpenLogoutConfirm(true);
  const handleCloseLogoutConfirm = () => setOpenLogoutConfirm(false);

  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null);
  };

  useEffect(() => {
    const count = notifications.filter((n) => !n.read).length;
    setUnreadCount(count);
  }, [notifications]);

  const confirmLogout = () => {
    handleCloseLogoutConfirm();
    sessionStorage.clear();
    navigate("/");
    CustomToast({ type: "success", message: "Logout realizado com sucesso!" });
  };

  useEffect(() => {
    const getUserName = () => {
      try {
        const userData = sessionStorage.getItem("user");
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUserName(parsedUser.nome || "Usuário");
        } else {
          setUserName("Usuário");
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        setUserName("Usuário");
      }
    };

    getUserName();
  }, []);

  return (
    <>
      <div className="hidden md:flex justify-end w-full h-8">
        <div
          className="transition-allbg-center lg:flex items-center justify-center w-full pt-4 md:pt-0 lg:w-[25%] h-16 bg-cover bg-no-repeat rounded-bl-lg pr-4"
          style={{
            borderRight: "1px solid #E2E8F0",
            background: "linear-gradient(180deg, #2C5282 0%, #3182CE 100%)",
          }}
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <IconButton
                onClick={handleMenuOpen}
                style={{
                  backgroundColor: "white",
                  color: "#2C5282",
                }}
              >
                <AccountCircleIcon />
              </IconButton>
            </div>

            <label className="text-white font-bold text-xs">
              {userName || "Carregando..."}
            </label>
          </div>
        </div>
      </div>

      <Menu
        anchorEl={notificationAnchorEl}
        open={Boolean(notificationAnchorEl)}
        onClose={handleNotificationMenuClose}
        className="p-4"
        PaperProps={{
          style: {
            width: 350,
            maxHeight: 450,
          },
        }}
      >
        <label className="text-xs font-bold text-black flex gap-2 items-center p-2">
          <NotificationsActiveIcon /> Notificações
        </label>
        <Divider />

        {notifications.length > 0 ? (
          <List>
            {notifications.map((notification) => (
              <React.Fragment key={notification.id}>
                <ListItem
                  alignItems="flex-start"
                  className={!notification.read ? "bg-gray-100" : ""}
                >
                  <ListItemText
                    primary={notification.title}
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          {notification.content}
                        </Typography>
                        <br />
                        <Typography variant="caption" color="textSecondary">
                          {notification.date}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Typography variant="body2" className="p-3 text-gray-500">
            Nenhuma notificação disponível
          </Typography>
        )}
      </Menu>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        className="p-4"
      >
        <MenuItem title="Usuário" className="flex items-center gap-2">
          <span className="text-xs text-black">{userName}</span>
        </MenuItem>
        <MenuItem
          onClick={handleOpenLogoutConfirm}
          title="Sair do sistema"
          className="flex items-center gap-2"
        >
          <LogoutIcon fontSize="small" className="text-red" /> Sair
        </MenuItem>
      </Menu>

      <Modal
        open={openLogoutConfirm}
        aria-labelledby="logout-modal-title"
        aria-describedby="logout-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-between">
            <Typography id="logout-modal-title" variant="h6" component="h2">
              <Title
                conteudo={"Confirmação de Logout"}
                fontSize={"18px"}
                fontWeight={"700"}
                color={"#2C5282"}
              />
            </Typography>
            <button
              className="text-red"
              title="Fechar"
              onClick={handleCloseLogoutConfirm}
            >
              <ClearIcon />
            </button>
          </div>
          <Typography id="logout-modal-description" sx={{ mt: 2 }}>
            <Title
              conteudo={"Tem certeza de que deseja sair?"}
              fontSize={"15px"}
              fontWeight={"500"}
            />
          </Typography>
          <div className="flex gap-2 justify-end mt-4">
            <ButtonComponent
              subtitle={"Corfirmar Logout"}
              title={"SIM"}
              onClick={confirmLogout}
            />
          </div>
        </Box>
      </Modal>

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center flex-col gap-4 bg-white bg-opacity-50 z-50">
          <div className="text-black font-semibold text-lg">
            Atualizando informações...
          </div>
          <CircularProgress sx={{ color: "#2C5282" }} />
        </div>
      )}
    </>
  );
};

export default HeaderPerfil;
