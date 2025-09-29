import CustomToast from "../../components/toast";
import httpsInstance from "../url";

export const atualizarContrato = async (
  contratoId,
  cliente_id,
  user_id,
  titulo,
  numero_contrato,
  procuracao_html,
  honorario_html,
  peticao_html
) => {
  const https = httpsInstance();
  const token = sessionStorage.getItem("token");

  if (!token) {
    window.location.href = "/";
    return;
  }

  try {
    const payload = {
      cliente_id,
      user_id,
      titulo,
      numero_contrato,
      procuracao_html,
      honorario_html,
      peticao_html,
    };

    const response = await https.put(`/contratos/${contratoId}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Erro ao atualizar contrato";
    CustomToast({ type: "error", message: errorMessage });
    throw error;
  }
};
