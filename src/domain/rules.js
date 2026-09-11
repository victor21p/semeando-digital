/**
 * REGRAS DE NEGÓCIO DO PROJETO SEMEANDO DIGITAL
 * Conforme REQUISITOS.md (v1.0 aprovado)
 */

export const DADOS_INSTITUICAO = {
  nome: "Centro Educacional Semeando",
  cnpj: "12.345.678/0001-90",
  endereco: "Rua Principal, s/n - Bairro Pontal da Ilha, São Luís - MA",
  telefone: "(98) 98765-4321",
  email: "contato@semeando.edu.br"
};

// RN-01 e RN-02: Tabela oficial de valores por série com modalidade de receita travada
export const TABELA_SERIES_PADRAO = [
  { id: "bercario", nome: "Berçário", segmento: "Infantil", modalidade: "Taxa de Associado", valorPadrao: 250.00 },
  { id: "maternal_1", nome: "Maternal I", segmento: "Infantil", modalidade: "Taxa de Associado", valorPadrao: 250.00 },
  { id: "maternal_2", nome: "Maternal II", segmento: "Infantil", modalidade: "Taxa de Associado", valorPadrao: 260.00 },
  { id: "pre_1", nome: "Pré I", segmento: "Infantil", modalidade: "Taxa de Associado", valorPadrao: 280.00 },
  { id: "pre_2", nome: "Pré II", segmento: "Infantil", modalidade: "Taxa de Associado", valorPadrao: 280.00 },
  { id: "fund_1", nome: "1º Ano Fundamental", segmento: "Fundamental", modalidade: "Mensalidade (Boleto)", valorPadrao: 350.00 },
  { id: "fund_2", nome: "2º Ano Fundamental", segmento: "Fundamental", modalidade: "Mensalidade (Boleto)", valorPadrao: 375.00 },
  { id: "fund_3", nome: "3º Ano Fundamental", segmento: "Fundamental", modalidade: "Mensalidade (Boleto)", valorPadrao: 375.00 },
  { id: "fund_4", nome: "4º Ano Fundamental", segmento: "Fundamental", modalidade: "Mensalidade (Boleto)", valorPadrao: 375.00 },
  { id: "fund_5", nome: "5º Ano Fundamental", segmento: "Fundamental", modalidade: "Mensalidade (Boleto)", valorPadrao: 375.00 }
];

/**
 * RN-03: Cálculo de encargos por atraso (Multa 2% + Mora 0,033% ao dia)
 */
export function calcularEncargos({ valorBase, dataVencimento, dataReferencia = new Date() }) {
  const venc = new Date(dataVencimento);
  const ref = new Date(dataReferencia);

  venc.setHours(0, 0, 0, 0);
  ref.setHours(0, 0, 0, 0);

  const diffMs = ref.getTime() - venc.getTime();
  const diasAtraso = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

  if (diasAtraso === 0) {
    return {
      diasAtraso: 0,
      multa: 0,
      juros: 0,
      total: Number(valorBase.toFixed(2)),
      status: "em_dia"
    };
  }

  const multa = Number((valorBase * 0.02).toFixed(2));
  const juros = Number((valorBase * 0.00033 * diasAtraso).toFixed(2));
  const total = Number((valorBase + multa + juros).toFixed(2));

  return {
    diasAtraso,
    multa,
    juros,
    total,
    status: "atrasado"
  };
}

/**
 * RN-04: Validação dos dados do menor em conformidade com o Art. 14 da LGPD
 */
export function validarCadastroAlunoLGPD(aluno) {
  const erros = [];

  if (!aluno.nome || aluno.nome.trim().length < 3) {
    erros.push("Nome completo do aluno é obrigatório.");
  }
  if (!aluno.dataNascimento) {
    erros.push("Data de nascimento do aluno é obrigatória.");
  }
  if (!aluno.serieId) {
    erros.push("Turma / série do aluno deve ser selecionada.");
  }
  if (!aluno.responsavel?.nome || aluno.responsavel.nome.trim().length < 3) {
    erros.push("Nome do responsável legal é obrigatório.");
  }
  if (!aluno.responsavel?.cpf || aluno.responsavel.cpf.replace(/\D/g, "").length < 11) {
    erros.push("CPF válido do responsável é obrigatório.");
  }
  if (!aluno.hospitalEmergencia || aluno.hospitalEmergencia.trim().length < 3) {
    erros.push("Hospital/UPA de referência para emergência é obrigatório (Art. 14 LGPD).");
  }
  if (!aluno.autorizadosRetirada || aluno.autorizadosRetirada.trim().length < 3) {
    erros.push("Lista de pessoas autorizadas a buscar a criança é obrigatória (Art. 14 LGPD).");
  }

  return {
    valido: erros.length === 0,
    erros
  };
}
