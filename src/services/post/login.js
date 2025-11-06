import CustomToast from "../../components/toast";
import httpsInstance from "../url";

export const login = async (email, senha) => {
  const https = httpsInstance();
  try {
    const response = await https.post("/login", {
      email,
      senha,
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Erro ao fazer login";

    CustomToast({ type: "error", message: errorMessage });
    throw error;
  }
};
