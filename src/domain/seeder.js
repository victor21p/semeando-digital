/**
 * GERADOR DE DADOS 100% SINTÉTICOS (LGPD COMPLIANT)
 * Popula ~150 alunos com dados fictícios para testes e simulação realista.
 */
import { TABELA_SERIES_PADRAO } from './rules';

const PRIMEIROS_NOMES = [
  "Lucas", "Mariana", "Gabriel", "Sophia", "Pedro", "Isabela", "Matheus", "Laura",
  "Davi", "Alice", "Bernardo", "Valentina", "Arthur", "Helena", "Enzo", "Manuela",
  "Gustavo", "Lara", "Felipe", "Lívia", "Lorenzo", "Júlia", "Thiago", "Beatriz",
  "Samuel", "Lorena", "Rafael", "Melissa", "Nicolas", "Cecília"
];

const SOBRENOMES = [
  "Silva", "Santos", "Oliveira", "Souza", "Rodrigues", "Ferreira", "Alves", "Pereira",
  "Lima", "Gomes", "Costa", "Ribeiro", "Martins", "Carvalho", "Almeida", "Lopes",
  "Soares", "Fernandes", "Vieira", "Barbosa", "Rocha", "Dias", "Nascimento", "Andrade"
];

const HOSPITAIS = [
  "UPA São Bernardo", "Hospital Municipal Djalma Marques (Socorrão I)",
  "Hospital da Criança de São Luís", "UPA Vinhais", "Hospital Guarás"
];

export function gerarDadosSinteticos(quantidade = 150) {
  const alunos = [];
  const totalTurmas = TABELA_SERIES_PADRAO.length;

  for (let i = 1; i <= quantidade; i++) {
    const nomeAluno = `${PRIMEIROS_NOMES[i % PRIMEIROS_NOMES.length]} ${SOBRENOMES[(i * 3) % SOBRENOMES.length]} (Fictício)`;
    const nomeResp = `${PRIMEIROS_NOMES[(i * 5) % PRIMEIROS_NOMES.length]} ${SOBRENOMES[(i * 3) % SOBRENOMES.length]} (Fictício)`;
    const turma = TABELA_SERIES_PADRAO[(i - 1) % totalTurmas];

    const cpfFicticio = `${String(100 + (i % 899))}.${String(200 + (i % 799))}.${String(300 + (i % 699))}-00`;
    const anoNascimento = turma.segmento === 'Infantil' ? 2021 + (i % 3) : 2015 + (i % 5);

    alunos.push({
      id: `ALU-${String(i).padStart(4, '0')}`,
      matricula: `2026${String(i).padStart(4, '0')}`,
      nome: nomeAluno,
      dataNascimento: `${anoNascimento}-04-${String(1 + (i % 27)).padStart(2, '0')}`,
      serieId: turma.id,
      serieNome: turma.nome,
      segmento: turma.segmento,
      modalidade: turma.modalidade,
      valorMensalidade: turma.valorPadrao,
      hospitalEmergencia: HOSPITAIS[i % HOSPITAIS.length],
      autorizadosRetirada: `${nomeResp} (Mãe/Pai) e Tio(a) Sintético(a)`,
      responsavel: {
        nome: nomeResp,
        cpf: cpfFicticio,
        parentesco: i % 2 === 0 ? "Mãe" : "Pai",
        telefone: `(98) 988${String(10 + (i % 89))}-${String(1000 + (i % 8999))}`,
        email: `responsavel.ficticio.${i}@exemplo.com.br`
      },
      statusMatricula: i % 15 === 0 ? "Pendente Documentação" : "Ativa",
      statusFinanceiro: i % 7 === 0 ? "Atrasado" : "Em dia",
      criadoEm: "2026-09-01T08:00:00.000Z"
    });
  }

  return {
    alunos,
    series: TABELA_SERIES_PADRAO
  };
}
