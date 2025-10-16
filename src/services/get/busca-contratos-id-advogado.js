import CustomToast from "../../components/toast";
import httpsInstance from "../url";

export const buscarContratosAdvogado = async (userId, page = 1, perPage = 10) => {
  const https = httpsInstance();
  const token = sessionStorage.getItem("token");

  try {
    const response = await https.get(`/contratos/user/${userId}`, {
      params: { page, perPage }, // ✅ Adiciona paginação
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      const { message, data } = error.response.data;
      
      // Token inválido
      if (message === "Credenciais inválidas") {
        CustomToast({ 
          type: "error", 
          message: "Sessão expirada. Redirecionando..." 
        });
        setTimeout(() => window.location.href = "/", 3000);
        return;
      }
      
      // Erro genérico da API
      CustomToast({ 
        type: "error", 
        message: message || "Erro ao buscar contratos" 
      });
    } else {
      // Erro de rede
      CustomToast({ 
        type: "error", 
        message: "Erro de conexão com o servidor" 
      });
    }
    throw error;
  }
};