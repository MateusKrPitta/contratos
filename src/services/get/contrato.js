import CustomToast from "../../components/toast";
import httpsInstance from "../url";

export const buscarContratos = async (page = 1, perPage = 5) => {
  const https = httpsInstance();
  const token = sessionStorage.getItem("token");

  try {
    const response = await https.get("/contratos", {
      params: {
        page: page,
        perPage: perPage,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message;
      const errorDetails = error.response.data.data;
      if (errorMessage === "Credenciais inválidas") {
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      } else if (
        errorDetails === "Usuário não possui permissão para listar contratos."
      ) {
        CustomToast({
          type: "warning",
          message: errorDetails,
        });
      } else {
        CustomToast({ type: "error", message: errorMessage });
      }
    }
    throw error;
  }
};
