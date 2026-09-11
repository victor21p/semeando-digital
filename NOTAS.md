# NOTAS — referência técnica de Semeando Digital

> Consultar quando faltar contexto e **antes de escrever código** (§6). Não precisa ler toda sessão.
> Aqui não entra caminho absoluto, nome de máquina nem senha.

## 1. Ambiente e como ligar
| Peça | Versão | Porta / onde |
|---|---|---|
| Node.js | v22.15.0 | runtime |
| Frontend | React 18 + Vite 8 | porta 3000 |
| Testes | Vitest 4.1.6 | CLI |
| Armazenamento | LocalStorage estruturado com Seeder sintético | Navegador |

- Toda vez: `bash start.sh`
- Testes rápidos: `bash scripts/smoke.sh` ou `npm run test -- --run`

## 2. Integrações e credenciais (NUNCA os valores)
| Serviço | Para quê | Chave no .env | Limite de gasto | Plano B se cair | Última rotação |
|---|---|---|---|---|---|
| App Config | Configuração de ambiente | `VITE_APP_ENV` | R$ 0,00 | Fallback local | 2026-09-11 |

## 3. Scripts
| Script | O que faz | Quando rodar | Trava de segurança |
|---|---|---|---|
| `start.sh` | Sobe o servidor Vite com hot-reload na porta 3000 | Início de sessão | Calcula próprio diretório |
| `scripts/smoke.sh` | Valida arquivos, permissões, testes e build | Antes de todo commit | Falha com exit code 1 se houver erros |

## 4. Banco e Armazenamento
| Entidade | Estrutura | Protegida? | Data | ROADMAP |
|---|---|---|---|---|
| `alunos` | ~150 registros com dados médicos e de retirada | Sim (LGPD) | 2026-09-11 | 0.4 / 1.2 |
| `series` | 10 turmas (Infantil a 5º ano) com valores travados | Sim | 2026-09-11 | 0.4 / 1.1 |
| `cobrancas` | Boletos e Taxas de associado com encargos | Sim | 2026-09-11 | 0.4 / 1.3 |

## 5. Mapa do sistema (lógica → rota → tela)
| Módulo | Lógica (serviço) | Rotas | Telas |
|---|---|---|---|
| Regras de Negócio | `src/domain/rules.js` | — | Cálculos e validações LGPD |
| Povoamento Sintético | `src/domain/seeder.js` | — | 150 alunos fictícios |
| Armazenamento | `src/domain/storage.js` | — | Persistência local |
| Interface Principal | `src/App.jsx` | `/` | Painel da Secretaria |

## 6. Erros já enfrentados
| Data | Sintoma | Causa real | Lição (regra que evita a família do erro) |
|---|---|---|---|
| 2026-09-11 | Git push recusado com erro 403 (write access not granted) | Token padrão do Codespaces originado de template não tinha escopo de escrita no repositório pessoal novo | Gerar e autorizar chave SSH no perfil do usuário no GitHub para conexões limpas e permanentes |

## 7. Decisões (técnicas e de negócio)
| Data | Decisão | Motivo | Alternativa descartada | Validada pelo usuário? |
|---|---|---|---|---|
| 2026-09-11 | Dados 100% sintéticos | Risco legal severo do Art. 14 da LGPD sobre dados reais de menores | Usar dados reais anonimizados | Sim (Aprovado) |
| 2026-09-11 | Tabela de valores travada no código e storage | Evitar o erro humano recorrente que causava rombo de R$ 51.000/ano | Deixar campo de valor livre para digitação | Sim (Aprovado) |
