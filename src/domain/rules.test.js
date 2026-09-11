import { describe, it, expect } from 'vitest';
import { TABELA_SERIES_PADRAO, calcularEncargos, validarCadastroAlunoLGPD } from './rules';

describe('Regras de Negócio - Semeando Digital', () => {
  it('RN-02: Turmas do 2º ao 5º ano devem estar travadas no valor oficial de R$ 375,00', () => {
    const turmas2ao5 = TABELA_SERIES_PADRAO.filter(t => ['fund_2', 'fund_3', 'fund_4', 'fund_5'].includes(t.id));
    expect(turmas2ao5).toHaveLength(4);
    turmas2ao5.forEach(turma => {
      expect(turma.valorPadrao).toBe(375.00);
      expect(turma.modalidade).toBe('Mensalidade (Boleto)');
    });
  });

  it('RN-01: Turmas de Educação Infantil devem operar sob modalidade Taxa de Associado', () => {
    const turmasInfantis = TABELA_SERIES_PADRAO.filter(t => t.segmento === 'Infantil');
    expect(turmasInfantis.length).toBeGreaterThanOrEqual(4);
    turmasInfantis.forEach(turma => {
      expect(turma.modalidade).toBe('Taxa de Associado');
    });
  });

  it('RN-03: Deve calcular multa de 2% e juros de 0,033% ao dia para pagamento com atraso', () => {
    const resultado = calcularEncargos({
      valorBase: 375.00,
      dataVencimento: '2026-09-01',
      dataReferencia: '2026-09-11' // 10 dias de atraso
    });

    expect(resultado.diasAtraso).toBe(10);
    expect(resultado.multa).toBe(7.50); // 2% de 375.00 = 7.50
    expect(resultado.juros).toBe(1.24); // 375 * 0.00033 * 10 = 1.2375 -> 1.24
    expect(resultado.total).toBe(383.74);
    expect(resultado.status).toBe('atrasado');
  });

  it('RN-03: Pagamento em dia não deve ter multa nem juros', () => {
    const resultado = calcularEncargos({
      valorBase: 375.00,
      dataVencimento: '2026-09-11',
      dataReferencia: '2026-09-11'
    });

    expect(resultado.diasAtraso).toBe(0);
    expect(resultado.multa).toBe(0);
    expect(resultado.juros).toBe(0);
    expect(resultado.total).toBe(375.00);
    expect(resultado.status).toBe('em_dia');
  });

  it('RN-04: Deve rejeitar cadastro de aluno sem campos obrigatórios de segurança LGPD', () => {
    const alunoInvalido = {
      nome: 'Aluno Teste',
      dataNascimento: '2018-05-10',
      serieId: 'fund_3',
      responsavel: { nome: 'Responsavel Teste', cpf: '123.456.789-00' }
      // Faltando hospitalEmergencia e autorizadosRetirada
    };

    const validacao = validarCadastroAlunoLGPD(alunoInvalido);
    expect(validacao.valido).toBe(false);
    expect(validacao.erros.some(e => e.includes('Hospital/UPA'))).toBe(true);
    expect(validacao.erros.some(e => e.includes('pessoas autorizadas'))).toBe(true);
  });
});
