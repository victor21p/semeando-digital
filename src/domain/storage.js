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
