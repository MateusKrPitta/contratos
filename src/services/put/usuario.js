import httpsInstance from "../url";
import CustomToast from "../../components/toast";

export const editarUsuario = async (
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
  id
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
    };

    const response = await https.put(`/users/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    CustomToast({
      type: "success",
      message: "Usuário atualizado com sucesso!",
    });
    return response.data;
  } catch (error) {
    let errorMessage = "Erro ao atualizar usuário.";

    if (error.response?.data?.errors && error.response.data.errors.length > 0) {
      errorMessage = error.response.data.errors[0].message;
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }

    CustomToast({ type: "error", message: errorMessage });
    throw error;
  }
};
