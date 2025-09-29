import httpsInstance from "../url";
import CustomToast from "../../components/toast";

export const deletarContrato = async (id) => {
  const https = httpsInstance();
  const token = sessionStorage.getItem("token");

  try {
    const response = await https.delete(`/contratos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.data && response.data.message) {
      CustomToast({ type: "success", message: response.data.message });
    }
    return response.data;
  } catch (error) {
    let errorMessage = "Erro ao deletar contrato!";

    if (error.response?.data) {
      if (error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.response.data.errors) {
        errorMessage = error.response.data.errors.join(", ") || errorMessage;
      } else if (error.response.data.success) {
        errorMessage = error.response.data.success;
      }
    }

    CustomToast({ type: "error", message: errorMessage });
    throw error;
  }
};
