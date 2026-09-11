import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import { DADOS_INSTITUICAO, TABELA_SERIES_PADRAO, calcularEncargos } from './domain/rules';
import { inicializarStorage, obterAlunos, obterSeries } from './domain/storage';

function App() {
  const [activeTab, setActiveTab] = useState('alunos');
  const [alunos, setAlunos] = useState([]);
  const [series, setSeries] = useState([]);
  const [busca, setBusca] = useState('');
  const [filtroSerie, setFiltroSerie] = useState('todas');

  // Estado da calculadora de encargos (RN-03)
  const [calcValor, setCalcValor] = useState(375.00);
  const [calcVencimento, setCalcVencimento] = useState('2026-09-01');
  const [calcPagamento, setCalcPagamento] = useState('2026-09-11');

  useEffect(() => {
    inicializarStorage();
    setAlunos(obterAlunos());
    setSeries(obterSeries());
  }, []);

  // Alunos filtrados por busca e turma
  const alunosFiltrados = useMemo(() => {
    return alunos.filter(aluno => {
      const bateuNome = aluno.nome.toLowerCase().includes(busca.toLowerCase()) ||
                        aluno.matricula.includes(busca) ||
                        aluno.responsavel.nome.toLowerCase().includes(busca.toLowerCase());
      const bateuSerie = filtroSerie === 'todas' || aluno.serieId === filtroSerie;
      return bateuNome && bateuSerie;
    });
  }, [alunos, busca, filtroSerie]);

  // Cálculo de encargos em tempo real
  const resultadoEncargos = useMemo(() => {
    return calcularEncargos({
      valorBase: Number(calcValor) || 0,
      dataVencimento: calcVencimento,
      dataReferencia: calcPagamento
    });
  }, [calcValor, calcVencimento, calcPagamento]);

  return (
    <div className="app-container">
      {/* Cabeçalho Institucional Oficial (RN-06 e LGPD) */}
      <header className="inst-header">
        <div className="inst-top">
          <div className="inst-title">
            <h1>🌱 Semeando Digital</h1>
            <div>{DADOS_INSTITUICAO.nome}</div>
          </div>
          <div className="badge-lgpd">
            🛡️ 100% Dados Sintéticos (LGPD Art. 14)
          </div>
        </div>
        <div className="inst-meta">
          <span><strong>CNPJ:</strong> {DADOS_INSTITUICAO.cnpj}</span>
          <span><strong>Endereço:</strong> {DADOS_INSTITUICAO.endereco}</span>
          <span><strong>Contato:</strong> {DADOS_INSTITUICAO.telefone}</span>
        </div>
      </header>

      {/* Cards de Resumo */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total de Alunos</h3>
          <div className="val">{alunos.length}</div>
        </div>
        <div className="stat-card">
          <h3>Turmas Ofertadas</h3>
          <div className="val">{series.length}</div>
        </div>
        <div className="stat-card">
          <h3>Modalidades de Receita</h3>
          <div className="val" style={{ fontSize: '1.2rem', color: '#0d9488' }}>
            Taxa (Infantil) + Boleto (Fund.)
          </div>
        </div>
        <div className="stat-card">
          <h3>Mensalidade Oficial (2º-5º)</h3>
          <div className="val" style={{ color: '#16a34a' }}>
            R$ 375,00
          </div>
        </div>
      </div>

      {/* Navegação por Abas */}
      <nav className="tabs">
        <button
          className={`tab-btn ${activeTab === 'alunos' ? 'active' : ''}`}
          onClick={() => setActiveTab('alunos')}
        >
          📋 Gestão de Alunos (~150)
        </button>
        <button
          className={`tab-btn ${activeTab === 'tabela' ? 'active' : ''}`}
          onClick={() => setActiveTab('tabela')}
        >
          💰 Tabela Oficial de Valores (RN-02)
        </button>
        <button
          className={`tab-btn ${activeTab === 'calculadora' ? 'active' : ''}`}
          onClick={() => setActiveTab('calculadora')}
        >
          🧮 Motor de Encargos (RN-03)
        </button>
      </nav>

      {/* Conteúdo da Aba Alunos */}
      {activeTab === 'alunos' && (
        <section className="content-card">
          <div className="search-bar">
            <input
              type="text"
              className="search-input"
              placeholder="Buscar por nome do aluno, matrícula ou responsável..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
            <select
              className="filter-select"
              value={filtroSerie}
              onChange={(e) => setFiltroSerie(e.target.value)}
            >
              <option value="todas">Todas as Turmas</option>
              {series.map(s => (
                <option key={s.id} value={s.id}>{s.nome} ({s.segmento})</option>
              ))}
            </select>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Matrícula</th>
                  <th>Aluno (Fictício)</th>
                  <th>Turma / Série</th>
                  <th>Modalidade de Cobrança</th>
                  <th>Valor Parcela</th>
                  <th>Hospital Emergência (LGPD)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {alunosFiltrados.slice(0, 30).map(aluno => (
                  <tr key={aluno.id}>
                    <td><code>{aluno.matricula}</code></td>
                    <td>
                      <strong>{aluno.nome}</strong>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        Resp: {aluno.responsavel.nome} ({aluno.responsavel.telefone})
                      </div>
                    </td>
                    <td>{aluno.serieNome}</td>
                    <td>
                      <span className={`tag ${aluno.segmento === 'Infantil' ? 'tag-infantil' : 'tag-fundamental'}`}>
                        {aluno.modalidade}
                      </span>
                    </td>
                    <td><strong>R$ {aluno.valorMensalidade.toFixed(2)}</strong></td>
                    <td style={{ fontSize: '0.8rem' }}>{aluno.hospitalEmergencia}</td>
                    <td>
                      <span className={`tag ${aluno.statusFinanceiro === 'Em dia' ? 'tag-sucesso' : 'tag-alerta'}`}>
                        {aluno.statusFinanceiro}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {alunosFiltrados.length > 30 && (
            <p style={{ textAlign: 'center', color: '#64748b', marginTop: 12, fontSize: '0.85rem' }}>
              Exibindo os primeiros 30 de {alunosFiltrados.length} alunos sintéticos.
            </p>
          )}
        </section>
      )}

      {/* Conteúdo da Aba Tabela Oficial */}
      {activeTab === 'tabela' && (
        <section className="content-card">
          <h2 style={{ marginTop: 0, fontSize: '1.2rem', color: '#1e3a8a' }}>
            Tabela Oficial de Séries e Modalidades (Trava de Segurança Financeira)
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            Esta tabela padroniza os valores de matrícula e elimina o risco de contratos emitidos com defasagem financeira (evitando perdas de até R$ 51.000,00 anuais).
          </p>
          <table className="data-table">
            <thead>
              <tr>
                <th>Série / Turma</th>
                <th>Segmento</th>
                <th>Modalidade Exigida</th>
                <th>Valor Travado</th>
                <th>Regra Aplicada</th>
              </tr>
            </thead>
            <tbody>
              {series.map(s => (
                <tr key={s.id}>
                  <td><strong>{s.nome}</strong></td>
                  <td>
                    <span className={`tag ${s.segmento === 'Infantil' ? 'tag-infantil' : 'tag-fundamental'}`}>
                      {s.segmento}
                    </span>
                  </td>
                  <td>{s.modalidade}</td>
                  <td>
                    <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#16a34a' }}>
                      R$ {s.valorPadrao.toFixed(2)}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.85rem', color: '#64748b' }}>
                    {['fund_2', 'fund_3', 'fund_4', 'fund_5'].includes(s.id)
                      ? '🛡️ Travado: valor oficial do Ensino Fundamental'
                      : 'Estatuto escolar regular'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* Conteúdo da Calculadora de Encargos */}
      {activeTab === 'calculadora' && (
        <section className="content-card">
          <h2 style={{ marginTop: 0, fontSize: '1.2rem', color: '#1e3a8a' }}>
            Motor de Cálculo de Encargos por Atraso (RN-03)
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            Regra automatizada: <strong>Multa fixa de 2%</strong> + <strong>Juros de mora de 0,033% ao dia</strong>.
          </p>

          <div className="calc-form">
            <div className="form-group">
              <label>Valor Base da Cobrança (R$):</label>
              <input
                type="number"
                step="0.01"
                value={calcValor}
                onChange={(e) => setCalcValor(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Data de Vencimento:</label>
              <input
                type="date"
                value={calcVencimento}
                onChange={(e) => setCalcVencimento(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Data de Pagamento Efetivo:</label>
              <input
                type="date"
                value={calcPagamento}
                onChange={(e) => setCalcPagamento(e.target.value)}
              />
            </div>

            <div className="calc-result">
              <div className="calc-row">
                <span>Dias em atraso:</span>
                <strong>{resultadoEncargos.diasAtraso} dias</strong>
              </div>
              <div className="calc-row">
                <span>Valor Base:</span>
                <span>R$ {Number(calcValor || 0).toFixed(2)}</span>
              </div>
              <div className="calc-row">
                <span>Multa por atraso (2% fixo):</span>
                <span style={{ color: '#dc2626' }}>+ R$ {resultadoEncargos.multa.toFixed(2)}</span>
              </div>
              <div className="calc-row">
                <span>Juros de mora (0,033% ao dia):</span>
                <span style={{ color: '#dc2626' }}>+ R$ {resultadoEncargos.juros.toFixed(2)}</span>
              </div>
              <div className="calc-row total">
                <span>Total Calculado:</span>
                <span>R$ {resultadoEncargos.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
