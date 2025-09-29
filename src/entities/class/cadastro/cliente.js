export const cadastrosCliente = (clientes) => {
  return clientes.map((cliente) => ({
    id: cliente.id,
    nome: cliente.nome,
    email: cliente.email,
    telefone: cliente.telefone,
    bairro: cliente.bairro,
    rg: cliente.rg,
    cpf: cliente.cpf,
    cidade: cliente.cidade,
    profissao: cliente.profissao,
    cep: cliente.cep,
    rua: cliente.rua,
    estado: cliente.estado,
    numero: cliente.numero,
    cnh: cliente.cnh,
  }));
};
