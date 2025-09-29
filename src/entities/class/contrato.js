export const cadastrosContratos = (contratos) => {
  return contratos.map((contrato) => ({
    id: contrato.id,
    cliente:
      contrato.clienteInfo?.nome ||
      contrato.clienteNome ||
      "Cliente não encontrado",
    advogado:
      contrato.advogadoInfo?.nome ||
      contrato.advogadoNome ||
      "Advogado não encontrado",
    titulo: contrato.titulo || "Sem título",
    clienteId: contrato.clienteId,
    userId: contrato.advogadoId,
    honorarioHtml: contrato.honorarioHtml,
    peticaoHtml: contrato.peticaoHtml,
    procuracaoHtml: contrato.procuracaoHtml,

    numeroContrato: contrato.numeroContrato,
    status: contrato.status,
    dataCriacao: contrato.dataCriacao,
    hash: contrato.hash,
    advogadoInfo: contrato.advogadoInfo,
    clienteInfo: contrato.clienteInfo,
  }));
};
