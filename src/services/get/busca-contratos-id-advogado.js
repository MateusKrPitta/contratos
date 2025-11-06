import CustomToast from "../../components/toast";
import httpsInstance from "../url";

export const buscarContratosAdvogado = async (
  userId,
  page = 1,
  perPage = 10
) => {
  const https = httpsInstance();
  const token = sessionStorage.getItem("token");

  try {
    const response = await https.get(`/contratos/user/${userId}`, {
      params: { page, perPage },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      const { message, data } = error.response.data;

      if (message === "Credenciais inválidas") {
        CustomToast({
          type: "error",
          message: "Sessão expirada. Redirecionando...",
        });
        setTimeout(() => (window.location.href = "/"), 3000);
        return;
      }

      CustomToast({
        type: "error",
        message: message || "Erro ao buscar contratos",
      });
    } else {
      CustomToast({
        type: "error",
        message: "Erro de conexão com o servidor",
      });
    }
    throw error;
  }
};
