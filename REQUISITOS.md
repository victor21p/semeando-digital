# REQUISITOS — Semeando Digital

| Status | ☐ RASCUNHO · ☐ EM REVISÃO · ☑ APROVADO |
|---|---|
| Versão | 1.0 |
| Aprovado por / em | Victor Gabriel Conceição Pereira / 2026-09-11 |

> Nenhum código antes de APROVADO. Mudança depois disso vira versão nova (§15), com aprovação.

## 1. Visão
| Pergunta | Resposta |
|---|---|
| Problema (a dor) | Gestão escolar conduzida manualmente em ~750 arquivos Word por ano por apenas 3 pessoas, sem banco central. Risco de perda financeira de até R$ 51.000/ano por erro manual em contratos (ex.: cobrando R$ 310 em vez de R$ 375), arquivos sobrescritos sem rastreabilidade e exposição de dados sensíveis de menores (LGPD Art. 14). |
| Para quem | Centro Educacional Semeando (escola comunitária com ~150 alunos no Pontal da Ilha, São Luís - MA) e sua equipe de gestão. |
| Como é resolvido hoje e o que é ruim | Arquivos Word salvos em pastas locais. Ruim porque gera dados desencontrados, divergência cadastral (endereços/nomes diferentes sob mesmo CNPJ), falta de histórico e risco financeiro e legal severo. |
| Objetivo | "Permitir que a equipe do Centro Educacional Semeando gerencie matrículas, contratos e cobranças de forma centralizada e segura, sem depender de arquivos manuais do Word e sem risco de evasão de receita ou infração à LGPD." |
| Como saberemos que deu certo (número) | 1. 100% dos ~150 alunos com cadastro único centralizado.<br>2. Zero divergências entre tabela oficial de valores e contratos emitidos (risco de R$ 51.000 zerado).<br>3. Tempo de renovação reduzido de meses para minutos por aluno. |

## 2. Usuários
| Perfil | Quem é | O que precisa fazer | Quantos |
|---|---|---|---|
| Administrador / Secretaria | Funcionários da escola que realizam matrícula e renovação | Cadastrar alunos e responsáveis, emitir contratos validados e gerar cobranças | ~3 pessoas |
| Direção Escolar | Gestor(a) da escola comunitária | Acompanhar painel geral de matrículas, inadimplência e relatórios financeiros | 1 a 2 pessoas |
| Responsável Legal (Fase futura) | Pai, mãe ou tutor da criança | Visualizar dados da matrícula e emitir 2ª via de boleto/taxa | ~150 responsáveis |

## 3. Escopo
**Faz:**
- Cadastro centralizado de alunos e responsáveis legais.
- Registro obrigatório de dados de segurança/saúde (hospital de emergência, lista de autorizados para retirada do menor).
- Emissão automatizada de contratos de matrícula com valores travados pela tabela oficial da série/ano.
- Gestão do modelo dual de receita: Taxa de associado (Educação Infantil) e Mensalidade com boleto (Ensino Fundamental).
- Cálculo automático de encargos (multa de 2% e juros de 0,033% ao dia).
- Painel de controle da secretaria com busca rápida, status de matrícula e relatórios financeiros.

**Não faz** (neste MVP):
- Não é portal pedagógico/EAD (não lança notas diárias ou diário de classe neste primeiro momento).
- Não faz disparo automático de mensagens por WhatsApp (fica para fase posterior).
- Não integra com catracas eletrônicas físicas.

## 4. Funções (Requisitos Funcionais)
> Prioridade: **Essencial** (sem isso não existe) · **Importante** · **Desejável** · **Não agora**.
> Todo item tem critério de aceite testável: é dele que sai o teste.

| ID | Como <perfil>, quero <ação>, para <benefício> | Prioridade | Critério de aceite (Dado ___, quando ___, então ___) |
|---|---|---|---|
| RF-01 | Como secretária, quero cadastrar alunos com responsáveis legais e dados de emergência, para centralizar as informações escolares com segurança. | **Essencial** | Dado que inicio um cadastro, quando preencho os dados do menor, responsável, hospital de emergência e autorizados a retirar, então o aluno é salvo e recebe um número de matrícula único. |
| RF-02 | Como administradora, quero gerenciar a tabela de valores oficiais de mensalidades e taxas por série, para que nenhum contrato seja gerado com valor incorreto. | **Essencial** | Dado que defino a mensalidade do 2º ao 5º ano como R$ 375,00, quando um contrato para essa turma for gerado, então o sistema preenche e trava automaticamente o valor em R$ 375,00. |
| RF-03 | Como secretária, quero emitir o contrato de matrícula em formato padronizado e para impressão/PDF, para substituir os modelos manuais em Word sem erros de digitação. | **Essencial** | Dado um aluno matriculado, quando clico em "Gerar Contrato", então o sistema gera o documento com dados institucionais oficiais (CNPJ e endereço únicos), dados das partes e cláusulas legais corretas. |
| RF-04 | Como secretária, quero gerenciar cobranças de acordo com o segmento (Taxa de Associado para Ed. Infantil vs Boleto para Ens. Fundamental), para atender a dualidade de receitas da escola. | **Essencial** | Dado um aluno matriculado, quando gero sua cobrança, então se for da Educação Infantil o tipo é "Taxa de Associado", e se for do Ensino Fundamental o tipo é "Mensalidade Escolar (Boleto)". |
| RF-05 | Como gestor, quero que o sistema calcule automaticamente multa de 2% e juros de 0,033% ao dia para parcelas atrasadas, para manter a consistência financeira sem erros manuais. | **Essencial** | Dado um boleto vencido há 10 dias no valor de R$ 375,00, quando consultado, então o sistema aplica 2% de multa (R$ 7,50) + 0,33% de juros (R$ 1,24), totalizando R$ 383,74. |
| RF-06 | Como secretária, quero consultar a lista dos ~150 alunos com filtros por turma, status de matrícula e adimplência, para ter visibilidade instantânea em vez de abrir dezenas de pastas. | **Importante** | Dado o painel da secretaria, quando busco por nome ou turma, então recebo a lista filtrada em menos de 1 segundo. |

## 5. Regras de negócio
| ID | Regra | Fonte (lei, documento, pessoa) | Fixa ou muda por cliente? |
|---|---|---|---|
| RN-01 | **Dualidade de Receita**: Educação Infantil paga taxa de associado; Ensino Fundamental paga mensalidade via boleto. | Estatuto/Modelo Escolar | Fixa por segmento escolar |
| RN-02 | **Tabela de Valores Oficial**: O valor da parcela do contrato deve ser travado pela série (ex.: 2º ao 5º ano = R$ 375,00), impedindo edição manual arbitrária que cause defasagem financeira. | Tabela oficial da escola | Fixa por série |
| RN-03 | **Encargos de Atraso**: Aplicação de multa de 2% e juros de mora de 0,033% ao dia em mensalidades atrasadas. | Regra contratual escolar | Fixa |
| RN-04 | **Proteção de Menores (LGPD)**: Coleta e armazenamento de dados de menores de idade estritamente vinculados ao consentimento dos responsáveis legais; campos de emergência e autorização de retirada são obrigatórios. | Art. 14 da Lei nº 13.709/2018 (LGPD) | Fixa por lei |
| RN-05 | **Dados 100% Sintéticos em Desenvolvimento**: Nenhum dado real de crianças ou responsáveis pode entrar em ambiente de desenvolvimento, testes ou repositório Git. | Política de Segurança do Projeto | Fixa |
| RN-06 | **Identidade Institucional Unificada**: Apenas uma única razão social, CNPJ e endereço oficial devem constar em todos os documentos e contratos gerados. | Ficha de Coleta (Apêndice B) | Fixa |

## 6. Como o sistema deve ser (Requisitos Não Funcionais)
| Tema | Requisito | Como medir |
|---|---|---|
| Dispositivos | Web App responsivo (funciona em navegadores desktop e tablets/smartphones). | Funcionar sem quebra de layout em resoluções de 375px a 1920px. |
| Dado pessoal / LGPD | Rastreabilidade de registros e dados de menores protegidos; sem exposição pública. | 100% dos dados reais blindados e uso de seeds sintéticas. |
| Vários clientes separados? | Não se aplica: sistema mono-instituição para o Centro Educacional Semeando. | Apenas dados da instituição. |
| Volume e velocidade | Capacidade para ~150 a 300 alunos ativos, ~1.500 a 3.000 cobranças anuais. Busca instantânea. | Resposta de consulta em < 500ms. |
| Pode ficar fora do ar? | Sistema de retaguarda interna. Quedas fora do horário de atendimento escolar não são críticas. | Tolerância a manutenções programadas fora do expediente. |
| Registro de quem fez o quê | Auditoria simples: registro de data/hora de criação e alteração em cada cadastro e cobrança. | Campos `criado_em` e `atualizado_em` em todas as tabelas. |
| Acesso (login, perfis) | Perfis: Administrador/Secretaria (acesso total) e Direção (relatórios). | Controle simples de permissão. |

## 7. Dados
| O que guarda | Campos principais | Sensível? | Quem vê |
|---|---|---|---|
| Aluno | Nome, data nascimento, sexo, série/turma, hospital de emergência, autorizados para retirada, status. | Sim (Menor de idade) | Secretaria e Direção |
| Responsável | Nome, CPF, parentesco, telefone, e-mail, endereço residencial. | Sim (LGPD) | Secretaria e Direção |
| Contrato / Matrícula | Número contrato, aluno, ano letivo, data emissão, valor parcela, status (assinado/pendente). | Moderado | Secretaria e Direção |
| Cobrança | Código, aluno, tipo (Taxa/Mensalidade), vencimento, valor base, valor pago, status (aberto/pago/atrasado). | Moderado | Secretaria e Direção |
| Tabela de Preços | Série, segmento (Infantil/Fundamental), modalidade (Taxa/Boleto), valor padrão. | Não | Secretaria e Direção |

## 8. Integrações
| Serviço | Para quê | Essencial no MVP? | Plano B se cair |
|---|---|---|---|
| Geração de Documentos (PDF) | Emissão e impressão de contratos padronizados | Sim | Impressão nativa do navegador (CSS Print) |
| Gerador de Massa Sintética (Faker) | Povoamento automático de ~150 alunos fictícios para testes realistas | Sim | Script de seed local com dados sintéticos versionados |
| Gateway de Cobrança Bancária | Emissão real de boletos bancários registrados | Não (Fase futura) | No MVP, emissão simulada com código de barras/linha digitável para controle interno |

## 9. Limites
| Tipo | Limite |
|---|---|
| Prazo | Conclusão do sistema funcional para planejamento do ano letivo de 2027. |
| Orçamento mensal | R$ 0,00 na fase de desenvolvimento (utilizando ferramentas e hospedagem gratuitas). |
| Restrições Éticas / Legais | Total proibição de dados reais de alunos da comunidade no repositório. |

## 10. Stack
| Camada | Escolha | Por quê | Custo/mês |
|---|---|---|---|
| Tela (frontend) | React 18 + Vite | Já estruturado no workspace, rápido, moderno e amplamente suportado. | R$ 0,00 |
| Estilização | Tailwind CSS / CSS Modules | Interface limpa, profissional e rápida para tabelas e formulários. | R$ 0,00 |
| Banco / Estado de Dados | Banco Relacional / Armazenamento Local estruturado e persistente com suporte a Seeders | Atende perfeitamente ao volume de ~150 alunos com portabilidade e zero custo de infraestrutura inicial. | R$ 0,00 |
| Testes | Vitest + Testing Library | Já configurados no projeto para garantir que as regras financeiras não quebrem. | R$ 0,00 |

## 11. Riscos
| Risco | Chance | Impacto | O que fazer |
|---|---|---|---|
| Vazamento acidental de dados de menores | Baixa | Crítico | Regra inviolável no `.gitignore` e uso exclusivo de geradores de dados fictícios. |
| Cálculo incorreto de juros e multas | Média | Alto | Testes unitários automatizados cobrindo cada cenário da RN-03. |
| Resistência da secretaria na transição do Word | Média | Médio | Interface intuitiva, geração de contratos idênticos aos exigidos e impressão em 1 clique. |

## 12. Perguntas em aberto
- Nenhuma pergunta bloqueante para o início do MVP.

## 13. MVP (Corte da Primeira Versão)
- **Perfil atendido:** Administrador / Secretaria da escola (~3 pessoas).
- **Jornada principal (Teste obrigatório de ponta a ponta):**
  1. Secretária acessa o sistema e clica em "Nova Matrícula".
  2. Cadastra o Aluno e o Responsável (com campos obrigatórios de hospital e autorizados a retirar).
  3. Seleciona a turma (ex.: 3º Ano do Fundamental): o sistema trava o valor em R$ 375,00 e define a modalidade "Boleto".
  4. Clica em "Gerar Contrato": o documento com dados institucionais unificados é exibido pronto para impressão.
  5. Clica em "Gerar Carnê de Cobrança": as 12 parcelas mensais são criadas automaticamente, com simulação de multa/juros se atrasar.
- **Entra:** RF-01, RF-02, RF-03, RF-04, RF-05, RF-06 e RN-01 a RN-06.
- **Fica para depois:** Portal online do responsável, envio de boletos por WhatsApp e diário escolar de notas.

## 14. Glossário
| Termo | Significado neste projeto |
|---|---|
| Taxa de Associado | Contribuição financeira mensal exclusiva das turmas de Educação Infantil. |
| Mensalidade Escolar | Cobrança mensal formal emitida via boleto bancário para o Ensino Fundamental. |
| Dados Sintéticos | Dados de pessoas e matrículas gerados artificialmente por computador, sem correspondência com pessoas reais, garantindo conformidade com a LGPD. |

## 15. Versões
| Versão | Data | O que mudou | Aprovado por |
|---|---|---|---|
| 0.1 | 2026-09-11 | Rascunho inicial baseado nos PDFs de coleta e narrativas | Victor Gabriel |
| 0.2 | 2026-09-11 | Documento completo com RFs, RNs, Stack e corte de MVP | Victor Gabriel |
| 1.0 | 2026-09-11 | Escopo formal aprovado para o MVP do Semeando Digital | Victor Gabriel Conceição Pereira |
