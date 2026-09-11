# REQUISITOS — Semeando Digital

| Status | ☑ RASCUNHO · ☐ EM REVISÃO · ☐ APROVADO |
|---|---|
| Versão | 0.1 |
| Aprovado por / em | — |

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
| Responsável Legal (Futuro) | Pai, mãe ou tutor da criança | Visualizar dados da matrícula e emitir 2ª via de boleto/taxa | ~150 responsáveis |

## 3. Escopo
**Faz:**
- Cadastro centralizado de alunos e responsáveis legais.
- Registro obrigatório de dados de segurança/saúde (hospital de emergência, autorizados para retirada do menor).
- Emissão automatizada de contratos de matrícula com valores travados pela tabela oficial da série/ano.
- Gestão do modelo dual de receita: Taxa de associado (Educação Infantil) e Mensalidade com boleto (Ensino Fundamental).
- Cálculo automático de encargos (multa de 2% e juros de 0,033% ao dia).

**Não faz** (neste MVP):
- Não é portal pedagógico/EAD (não lança notas diárias ou diário de classe neste primeiro momento).
- Não faz envio automático de mensagens por WhatsApp (fica para fase posterior).
- Não integra com catracas eletrônicas físicas.

## 5. Regras de negócio
| ID | Regra | Fonte (lei, documento, pessoa) | Fixa ou muda por cliente? |
|---|---|---|---|
| RN-01 | **Dualidade de Receita**: Educação Infantil paga taxa de associado; Ensino Fundamental paga mensalidade via boleto. | Estatuto/Modelo Escolar | Fixa por segmento escolar |
| RN-02 | **Tabela de Valores Oficial**: O valor da parcela do contrato deve ser travado pela série (ex.: 2º ao 5º ano = R$ 375,00), impedindo edição livre de valor que gere defasagem. | Tabela oficial da escola | Fixa por série |
| RN-03 | **Encargos de Atraso**: Aplicação de multa de 2% e juros de mora de 0,033% ao dia em mensalidades atrasadas. | Regra contratual | Fixa |
| RN-04 | **Proteção de Menores (LGPD)**: Coleta e armazenamento de dados de menores de idade estritamente vinculados ao consentimento dos responsáveis legais; campos de emergência e autorização de retirada são obrigatórios. | Art. 14 da Lei nº 13.709/2018 (LGPD) | Fixa por lei |
| RN-05 | **Dados 100% Sintéticos em Desenvolvimento**: Nenhum dado real de crianças pode entrar em ambiente de desenvolvimento, testes ou repositório Git. | Política de Segurança do Projeto | Fixa |

