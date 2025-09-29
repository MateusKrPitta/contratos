export const cadastrosUsuarios = (usuarios) => {
  return usuarios.map((usuario) => ({
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    username: usuario.nome,
    permissao: usuario.permissao,
    cpf: usuario.cpf,
    cidade: usuario.cidade,
    oab: usuario.oab,
    profissao: usuario.profissao,
    cep: usuario.cep,
    rua: usuario.rua,
    estado: usuario.estado,
    numero: usuario.numero,
    bairro: usuario.bairro,
    telefone: usuario.telefone,
    rg: usuario.rg,
  }));
};
