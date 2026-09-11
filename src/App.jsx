import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import { DADOS_INSTITUICAO, calcularEncargos } from './domain/rules';
import {
  inicializarStorage,
  obterAlunos,
  obterSeries,
  atualizarValorSerie,
  restaurarSeriesPadrao
} from './domain/storage';

function App() {
  const [activeTab, setActiveTab] = useState('alunos');
  const [alunos, setAlunos] = useState([]);
  const [series, setSeries] = useState([]);
  const [busca, setBusca] = useState('');
  const [filtroSerie, setFiltroSerie] = useState('todas');

  // Estado de edição da tabela de valores (ROADMAP 1.1)
  const [editandoSerieId, setEditandoSerieId] = useState(null);
  const [valorEdicao, setValorEdicao] = useState('');
  const [feedback, setFeedback] = useState(null);

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

  // Ações da Tabela Oficial (Item 1.1)
  const handleIniciarEdicao = (serie) => {
    setEditandoSerieId(serie.id);
    setValorEdicao(String(serie.valorPadrao));
  };

  const handleSalvarValor = (serieId) => {
    try {
      const resultado = atualizarValorSerie(serieId, valorEdicao);
      setSeries(resultado.series);
      setAlunos(resultado.alunos);
      setEditandoSerieId(null);
      setFeedback({
        tipo: 'sucesso',
        texto: `Valor atualizado para R$ ${Number(valorEdicao).toFixed(2)} com sucesso!`
      });
      setTimeout(() => setFeedback(null), 4000);
    } catch (err) {
      setFeedback({ tipo: 'erro', texto: err.message });
    }
  };

  const handleRestaurarPadroes = () => {
    if (window.confirm("Deseja restaurar a tabela para os valores oficiais originais?")) {
      const seriesPadrao = restaurarSeriesPadrao();
      setSeries(seriesPadrao);
      setEditandoSerieId(null);
      setFeedback({ tipo: 'sucesso', texto: 'Valores oficiais restaurados com sucesso!' });
      setTimeout(() => setFeedback(null), 4000);
    }
  };

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
            R$ {series.find(s => s.id === 'fund_2')?.valorPadrao.toFixed(2) || '375,00'}
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

      {/* Feedback Alert */}
      {feedback && (
        <div className={`alert-banner alert-${feedback.tipo}`}>
          {feedback.texto}
        </div>
      )}

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

      {/* Conteúdo da Aba Tabela Oficial (Item 1.1) */}
      {activeTab === 'tabela' && (
        <section className="content-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.2rem', color: '#1e3a8a' }}>
                Tabela Oficial de Séries e Mensalidades (Trava de Segurança)
              </h2>
              <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '0.85rem' }}>
                Valores padronizados que alimentam os novos contratos, eliminando erros manuais de digitação.
              </p>
            </div>
            <button
              className="btn-danger-outline"
              onClick={handleRestaurarPadroes}
              title="Voltar aos valores oficiais padrão"
            >
              Restaurar Padrões
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Série / Turma</th>
                  <th>Segmento</th>
                  <th>Modalidade Exigida</th>
                  <th>Valor Travado</th>
                  <th>Regra Aplicada</th>
                  <th style={{ textAlign: 'center' }}>Ação</th>
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
                      {editandoSerieId === s.id ? (
                        <div className="edit-input-group">
                          <span>R$</span>
                          <input
                            type="number"
                            step="0.01"
                            className="edit-val-input"
                            value={valorEdicao}
                            onChange={(e) => setValorEdicao(e.target.value)}
                            autoFocus
                          />
                        </div>
                      ) : (
                        <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#16a34a' }}>
                          R$ {s.valorPadrao.toFixed(2)}
                        </span>
                      )}
                    </td>
                    <td style={{ fontSize: '0.85rem', color: '#64748b' }}>
                      {['fund_2', 'fund_3', 'fund_4', 'fund_5'].includes(s.id)
                        ? '🛡️ Travado: tabela oficial do Fundamental'
                        : 'Estatuto escolar regular'}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      {editandoSerieId === s.id ? (
                        <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
                          <button
                            className="btn-primary"
                            onClick={() => handleSalvarValor(s.id)}
                          >
                            Salvar
                          </button>
                          <button
                            className="btn-secondary"
                            onClick={() => setEditandoSerieId(null)}
                          >
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <button
                          className="btn-secondary"
                          onClick={() => handleIniciarEdicao(s)}
                        >
                          Editar Valor
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
