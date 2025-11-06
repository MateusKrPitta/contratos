import CustomToast from "../../components/toast";
import httpsInstance from "../url";

export const criarCliente = async (
  nome,
  email,
  telefone,
  rg,
  cnh,
  profissao,
  cpf,
  cep,
  cidade,
  estado,
  rua,
  numero,
  bairro
) => {
  const https = httpsInstance();
  const token = sessionStorage.getItem("token");
  if (!token) {
    window.location.href = "/";
    return;
  }
  try {
    const payload = {
      nome,
      email,
      telefone,
      rg,
      cnh,
      profissao,
      cpf,
      cep,
      cidade,
      estado,
      rua,
      numero,
      bairro,
    };

    const response = await https.post("/clientes", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success) {
      CustomToast({ type: "success", message: response.data.message });
    }

    return response.data;
  } catch (error) {
    const errorDetails =
      error.response?.data?.details || error.response?.data?.message;
    const errorMessage = errorDetails || "Erro ao cadastrar cliente";

    CustomToast({ type: "error", message: errorMessage });
    throw error;
  }
};
