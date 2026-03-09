import CustomToast from "../../components/toast";
import httpsInstance from "../url";

export const duplicarContrato = async (contratoId) => {
  const https = httpsInstance();
  const token = sessionStorage.getItem("token");

  if (!token) {
    window.location.href = "/";
    return;
  }

  try {
    const response = await https.post(
      `/contratos/${contratoId}/duplicar`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    CustomToast({
      type: "success",
      message: response.data.message || "Contrato duplicado com sucesso!",
    });

    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Erro ao duplicar contrato";
    CustomToast({ type: "error", message: errorMessage });
    throw error;
  }
};
