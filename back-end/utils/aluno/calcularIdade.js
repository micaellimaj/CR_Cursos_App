// utils/aluno/calcularIdade.js

module.exports = function calcularIdade(dataNascimentoString) {
  // 1. Extrair dia, mês e ano da string 'DD/MM/AAAA'
  const parts = dataNascimentoString.split('/');

  // Validação básica para formato: verifica se há 3 partes e se todas são dígitos
  if (parts.length !== 3 || !/^\d+$/.test(parts[0]) || !/^\d+$/.test(parts[1]) || !/^\d+$/.test(parts[2])) {
    console.warn("Formato de data inválido para cálculo de idade no backend:", dataNascimentoString);
    return NaN; // Retorna NaN para indicar um erro claro
  }

  const dia = parseInt(parts[0], 10);
  const mes = parseInt(parts[1], 10); // Mês no formato 1-12
  const ano = parseInt(parts[2], 10);

  // Validação de números válidos e ano com 4 dígitos
  if (isNaN(dia) || isNaN(mes) || isNaN(ano) || ano.toString().length !== 4) {
    console.warn("Valores numéricos inválidos na data de nascimento no backend:", dataNascimentoString);
    return NaN;
  }

  // 2. Criar um objeto Date no formato YYYY-MM-DD
  // Lembre-se: no construtor de Date, o mês é base 0 (janeiro é 0, fevereiro é 1, etc.).
  const nascimento = new Date(ano, mes - 1, dia);

  // 3. Validação de data "real" (ex: evitar 31/02/2000)
  // Se a data criada não corresponde aos valores originais, é uma data inválida.
  if (nascimento.getFullYear() !== ano || nascimento.getMonth() !== (mes - 1) || nascimento.getDate() !== dia) {
    console.warn("Data de nascimento inválida (e.g., dia ou mês inexistente):", dataNascimentoString);
    return NaN;
  }

  const hoje = new Date();
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const m = hoje.getMonth() - nascimento.getMonth();

  if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }

  // Retorna a idade calculada. Se o cálculo resultou em NaN, ele será retornado.
  return idade;
};