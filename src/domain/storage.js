/**
 * GERENCIADOR DE ARMAZENAMENTO LOCAL E PERSISTÊNCIA
 * Armazena o estado do sistema no localStorage com inicialização de dados sintéticos.
 */
import { gerarDadosSinteticos } from './seeder';
import { TABELA_SERIES_PADRAO, DADOS_INSTITUICAO, calcularEncargos } from './rules';

const STORAGE_KEYS = {
  ALUNOS: 'semeando_digital_alunos',
  SERIES: 'semeando_digital_series',
  CONTRATOS: 'semeando_digital_contratos',
  COBRANCAS: 'semeando_digital_cobrancas'
};

export function inicializarStorage(forcarReset = false) {
  if (typeof window === 'undefined') return;

  const temAlunos = localStorage.getItem(STORAGE_KEYS.ALUNOS);

  if (!temAlunos || forcarReset) {
    const dadosIniciais = gerarDadosSinteticos(150);
    localStorage.setItem(STORAGE_KEYS.ALUNOS, JSON.stringify(dadosIniciais.alunos));
    localStorage.setItem(STORAGE_KEYS.SERIES, JSON.stringify(dadosIniciais.series));
    localStorage.setItem(STORAGE_KEYS.CONTRATOS, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.COBRANCAS, JSON.stringify([]));
  }
}

export function obterAlunos() {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(STORAGE_KEYS.ALUNOS);
  return raw ? JSON.parse(raw) : [];
}

export function salvarAluno(novoAluno) {
  const alunos = obterAlunos();
  const index = alunos.findIndex(a => a.id === novoAluno.id);
  if (index >= 0) {
    alunos[index] = { ...alunos[index], ...novoAluno, atualizadoEm: new Date().toISOString() };
  } else {
    alunos.unshift({
      ...novoAluno,
      id: novoAluno.id || `ALU-${String(alunos.length + 1).padStart(4, '0')}`,
      matricula: novoAluno.matricula || `2026${String(alunos.length + 1).padStart(4, '0')}`,
      criadoEm: new Date().toISOString()
    });
  }
  localStorage.setItem(STORAGE_KEYS.ALUNOS, JSON.stringify(alunos));
  return alunos;
}

export function obterSeries() {
  if (typeof window === 'undefined') return TABELA_SERIES_PADRAO;
  const raw = localStorage.getItem(STORAGE_KEYS.SERIES);
  return raw ? JSON.parse(raw) : TABELA_SERIES_PADRAO;
}

export function salvarSeries(novasSeries) {
  localStorage.setItem(STORAGE_KEYS.SERIES, JSON.stringify(novasSeries));
  return novasSeries;
}

export function atualizarValorSerie(serieId, novoValor) {
  const valor = Number(novoValor);
  if (isNaN(valor) || valor <= 0) {
    throw new Error('O valor da mensalidade deve ser um número positivo maior que zero.');
  }

  const series = obterSeries();
  const index = series.findIndex(s => s.id === serieId);
  if (index === -1) {
    throw new Error(`Série com ID ${serieId} não encontrada.`);
  }

  series[index] = {
    ...series[index],
    valorPadrao: Number(valor.toFixed(2)),
    atualizadoEm: new Date().toISOString()
  };

  salvarSeries(series);

  // Também sincroniza o valor dos alunos matriculados nessa turma
  const alunos = obterAlunos();
  let alterouAlunos = false;
  const alunosAtualizados = alunos.map(aluno => {
    if (aluno.serieId === serieId) {
      alterouAlunos = true;
      return { ...aluno, valorMensalidade: Number(valor.toFixed(2)) };
    }
    return aluno;
  });

  if (alterouAlunos) {
    localStorage.setItem(STORAGE_KEYS.ALUNOS, JSON.stringify(alunosAtualizados));
  }

  return { series, alunos: alunosAtualizados };
}

export function restaurarSeriesPadrao() {
  localStorage.setItem(STORAGE_KEYS.SERIES, JSON.stringify(TABELA_SERIES_PADRAO));
  return TABELA_SERIES_PADRAO;
}

