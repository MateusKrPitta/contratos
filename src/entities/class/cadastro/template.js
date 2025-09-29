export const cadastrosTemplate = (templates) => {
  return templates.map((template) => ({
    id: template.id,
    nome: template.nome,
  }));
};
