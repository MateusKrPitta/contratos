import React, { useState } from "react";
import {
  Mail,
  Password,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import packageJson from "../../../package.json";
import Contratos from "../../assets/png/contrato.png";
import "./login.css";
import { login } from "../../services/post/login";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    try {
      const response = await login(email, senha);

      sessionStorage.setItem("user", JSON.stringify(response.user));
      sessionStorage.setItem("token", response.token.token);
      sessionStorage.setItem("tokenType", response.token.type);

      navigate("/dashboard");
    } catch (error) {
      console.error("Erro no login:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <Box
      className="login-container"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #2C5282 0%, #3182CE 50%, #63B3ED 100%)",
        backgroundSize: "400% 400%",
        animation: "gradient 15s ease infinite",
      }}
      onKeyPress={handleKeyPress}
    >
      <Paper
        elevation={10}
        sx={{
          p: 4,
          borderRadius: 3,
          width: "100%",
          maxWidth: 400,
          display: "flex",
          gap: "20px",
          flexDirection: "column",
          bgcolor: "white",
          textAlign: "center",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Box
          sx={{
            mb: 2,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #2C5282 0%, #3182CE 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 10px rgba(44, 82, 130, 0.3)",
            }}
          >
            <img
              src={Contratos}
              alt="Logo"
              style={{
                width: "65px",
                filter: "brightness(0) invert(1)",
                padding: "10px",
              }}
            />
          </div>
        </Box>

        <label
          className="font-bold text-2xl"
          style={{ color: "#2C5282", fontWeight: "700" }}
        >
          Sistema Contratos
        </label>

        <label
          className="text-sm"
          style={{ marginBottom: "10px", color: "#4A5568" }}
        >
          Faça login para acessar o sistema
        </label>

        <TextField
          fullWidth
          label="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          size="small"
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": { borderColor: "#3182CE" },
              "&.Mui-focused fieldset": { borderColor: "#3182CE" },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Mail fontSize="small" sx={{ color: "#3182CE" }} />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          label="Senha"
          type={showPassword ? "text" : "password"}
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          size="small"
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": { borderColor: "#3182CE" },
              "&.Mui-focused fieldset": { borderColor: "#3182CE" },
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  sx={{ color: "#3182CE" }}
                >
                  {showPassword ? (
                    <VisibilityOffOutlined fontSize="small" />
                  ) : (
                    <VisibilityOutlined fontSize="small" />
                  )}
                </IconButton>
              </InputAdornment>
            ),
            startAdornment: (
              <InputAdornment position="start">
                <Password fontSize="small" sx={{ color: "#3182CE" }} />
              </InputAdornment>
            ),
          }}
        />

        <Button
          fullWidth
          variant="contained"
          disabled={loading}
          onClick={handleLogin}
          sx={{
            py: 1.5,
            mt: 1,
            mb: 2,
            background: "linear-gradient(135deg, #3182CE 0%, #2C5282 100%)",
            fontWeight: "600",
            fontSize: "16px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(49, 130, 206, 0.3)",
            "&:hover": {
              background: "linear-gradient(135deg, #2C5282 0%, #3182CE 100%)",
              boxShadow: "0 6px 12px rgba(49, 130, 206, 0.4)",
            },
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Entrar"}
        </Button>

        <label
          className="text-xs mt-4 font-medium"
          style={{ color: "#718096" }}
        >
          Versão {packageJson.version}
        </label>
      </Paper>

      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </Box>
  );
};

export default Login;
