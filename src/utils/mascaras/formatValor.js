export const mascaraValor = (valor) => {
  if (typeof valor === "number") {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  const valorNumerico = valor.replace(/\D/g, "");
  const valorDecimal = parseFloat(valorNumerico) / 100;

  return valorDecimal.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
