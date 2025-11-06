export const buscarEnderecoPorCep = async (cep) => {
  try {
    const cepLimpo = cep.replace(/\D/g, "");

    if (cepLimpo.length !== 8) {
      throw new Error("CEP deve ter 8 dígitos");
    }

    const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);

    if (!response.ok) {
      throw new Error("Erro ao buscar CEP");
    }

    const data = await response.json();

    if (data.erro) {
      throw new Error("CEP não encontrado");
    }

    return {
      logradouro: data.logradouro || "",
      bairro: data.bairro || "",
      localidade: data.localidade || "",
      uf: data.uf || "",
      cep: data.cep || "",
    };
  } catch (error) {
    console.error("Erro ao buscar CEP:", error);
    throw error;
  }
};
