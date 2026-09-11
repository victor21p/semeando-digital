# ROADMAP — Semeando Digital

> Ordem única do trabalho. Nasce do REQUISITOS aprovado; todo item cita o requisito.
> Status: 🔵 na fila · 🟡 fazendo · ✅ feito · ⏸️ bloqueado · 🔴 urgente (fura a fila)

## Regras
1. Segue a ordem das fases. Fase só fecha com todos os itens ✅ (ou movidos de propósito, com anotação).
2. Ideia nova não vira desvio: entra em "Ideias novas" com data → comparada com o que já existe (no código,
   não na memória) → se for trabalho real, ganha número numa fase.
3. Exceção única: bug crítico (sistema quebrado, dado errado, falha de segurança) vira 🔴 no topo.
4. Antes de marcar ✅, conferir no código e com o usuário.

## Fase 0 — Fundação (Etapa 5)
| # | Item | Status | O que o usuário vê |
|---|---|---|---|
| 0.1 | Ferramentas da stack instaladas (Node, React, Vite, Vitest) | ✅ | versões respondendo no terminal |
| 0.2 | Variáveis de ambiente + `.env.example` preenchido | ✅ | arquivo de configuração pronto |
| 0.3 | Esqueleto do sistema + `start.sh` | ✅ | tela inicial do Semeando Digital abre no navegador |
| 0.4 | Camada de Armazenamento e Domínio + Seeder com dados 100% sintéticos | ✅ | alunos e turmas sintéticos carregados |
| 0.5 | `scripts/smoke.sh` com o 1º teste + `NOTAS.md` | ✅ | teste rápido validando que o sistema liga |

## Fase 1 — MVP (Etapa 6)
| # | Item | Requisito | Status | O que o usuário vê |
|---|---|---|---|---|
| 1.1 | Tabela Oficial de Valores e Séries | RF-02, RN-02 | 🔵 | Tela com turmas e mensalidades travadas (ex.: 2º-5º ano R$ 375,00) |
| 1.2 | Cadastro de Alunos e Responsáveis com Blindagem LGPD | RF-01, RN-04, RN-05 | 🔵 | Formulário completo com campos obrigatórios de emergência e retirada |
| 1.3 | Motor de Cobrança Dual e Cálculo Automático de Encargos | RF-04, RF-05, RN-01, RN-03 | 🔵 | Taxa de Associado vs Boleto com multa de 2% e juros de 0,033%/dia aplicados |
| 1.4 | Emissão e Impressão de Contrato Padronizado | RF-03, RN-06 | 🔵 | Contrato oficial unificado pronto para visualização e impressão em PDF |
| 1.5 | Painel de Controle da Secretaria e Listagem de Alunos | RF-06 | 🔵 | Tabela com busca rápida, filtros e status financeiro/matrícula |
| 1.6 | Teste da jornada principal ponta a ponta | REQUISITOS §13 | 🔵 | Fluxo completo executado com sucesso: matrícula → contrato → carnê |

## Fase S — Segurança e publicação (Etapas 7 e 8)
| # | Item | Status |
|---|---|---|
| S.1 | Gate de segurança completo (`SEGURANCA.md`) | 🔵 |
| S.2 | Publicação (com aprovação) | 🔵 |
| S.3 | Monitoramento + rotina de manutenção | 🔵 |

## Fase 2 — Importantes (depois da publicação)
| # | Item | Requisito | Status |
|---|---|---|---|
| 2.1 | Envio de avisos de cobrança por WhatsApp | Desejável | 🔵 |
| 2.2 | Portal online para responsáveis | Desejável | 🔵 |
| 2.3 | Diário de classe e lançamento de notas | Desejável | 🔵 |

## Decisões pendentes do usuário
| # | Decisão | Bloqueia |
|---|---|---|
| — | Nenhuma decisão pendente no momento | — |

## Ideias novas (caixa de entrada: nunca apagar, só mudar o status)
> Nenhuma ideia nova pendente.

## Histórico
| Data | Evento |
|---|---|
| 2026-09-11 | Roadmap criado a partir do REQUISITOS v1.0 aprovado |
