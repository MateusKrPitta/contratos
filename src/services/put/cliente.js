import httpsInstance from "../url";
import CustomToast from "../../components/toast";

export const atualizarCliente = async (
  id,
  nome,
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
  numero_contrato,
  titulos,
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
      numero_contrato,
      titulos,
    };

    const response = await https.put(`/clientes/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    CustomToast({
      type: "success",
      message: "Cliente atualizado com sucesso!",
    });
    return response.data;
  } catch (error) {
    let errorMessage = "Erro ao atualizar cliente.";

    if (error.response?.data?.details) {
      errorMessage = error.response.data.details;
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (
      error.response?.data?.errors &&
      error.response.data.errors.length > 0
    ) {
      errorMessage = error.response.data.errors[0].message;
    } else if (error.message) {
      errorMessage = error.message;
    }

    CustomToast({ type: "error", message: errorMessage });
    throw error;
  }
};
