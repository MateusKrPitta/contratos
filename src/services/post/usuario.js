import CustomToast from "../../components/toast";
import httpsInstance from "../url";

export const criarUsuario = async (
  nome,
  senha,
  email,
  permissao,
  oab,
  profissao,
  cpf,
  cep,
  cidade,
  estado,
  rua,
  numero,
  rg,
  telefone,
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
      senha,
      email,
      permissao,
      oab,
      profissao,
      cpf,
      cep,
      cidade,
      estado,
      rua,
      numero,
      rg,
      telefone,
      bairro,
    };

    const response = await https.post("/users", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    let errorMessage = "Erro ao criar usuário.";

    if (error.response?.data?.errors && error.response.data.errors.length > 0) {
      errorMessage = error.response.data.errors[0].message;
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.response?.data?.success !== undefined) {
      errorMessage = error.response.data.success;
    } else if (error.message) {
      errorMessage = error.message;
    }

    CustomToast({ type: "error", message: errorMessage });
    throw error;
  }
};
