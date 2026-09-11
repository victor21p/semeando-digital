# 🌱 Semeando Digital

> **Sistema Integrado de Gestão Escolar e Centralização de Dados**  
> Desenvolvido para o **Centro Educacional Semeando** (Bairro Pontal da Ilha, São Luís - MA).  
> Projeto comunitário (PIC) do curso de **Engenharia de Software da UNDB**.  
> **Responsável / Arquiteto de Domínio:** Victor Gabriel Conceição Pereira.

---

## 🎯 Objetivo e Contexto

O **Semeando Digital** foi projetado para substituir a gestão escolar manual anterior (que dependia de cerca de 750 arquivos Word por ano processados por apenas 3 pessoas na secretaria) por um sistema centralizado, seguro e auditável.

### Principais Dores Resolvidas:
1. **Fim do Rombo Financeiro:** Bloqueio de divergências entre contratos emitidos e a tabela oficial de mensalidades (evitando perdas de até R$ 51.000,00 anuais, equivalente a 11% da receita).
2. **Dualidade de Receitas:** Gestão unificada da **Taxa de Associado** (Educação Infantil) e **Mensalidade com Boleto** (Ensino Fundamental).
3. **Blindagem LGPD (Art. 14 da Lei nº 13.709/2018):** Proteção integral de dados sensíveis de menores, com campos mandatórios de hospital de emergência conveniado e pessoas autorizadas para retirada da criança.
4. **Ambiente com 100% Dados Sintéticos:** Nenhum dado real de crianças da comunidade é utilizado no desenvolvimento ou testes.

---

## 🚀 Como Executar o Protótipo

### 1. Iniciar o Sistema (Servidor Web)
```bash
bash start.sh
```
Acesse a aplicação no navegador em: **`http://localhost:3000`**

### 2. Rodar os Testes de Integridade (Smoke Tests)
```bash
bash scripts/smoke.sh
```

### 3. Rodar a Suíte de Testes Unitários
```bash
npm run test -- --run
```

---

## 🖥️ O que já está acessível no Protótipo:

* **📋 Painel de Alunos:** Listagem e busca rápida em tempo real de **150 alunos sintéticos**, com filtros por turma/série e status financeiro.
* **💰 Tabela Oficial de Valores (RN-02):** Trava de segurança que estabelece a mensalidade oficial (R$ 375,00 para 2º ao 5º ano) com formulário para reajustes oficiais e botão de restauração.
* **🧮 Motor de Encargos por Atraso (RN-03):** Cálculo automático em tempo real de **multa de 2%** e **juros de mora de 0,033% ao dia**.
* **🛡️ Identidade Institucional Única:** Razão social, CNPJ e endereço unificados para emissão documental padronizada.

---

## 📚 Documentos de Governança do Projeto

* 🧭 [`ESTADO.md`](./ESTADO.md) — Painel de controle e onde paramos em cada etapa.
* 📋 [`REQUISITOS.md`](./REQUISITOS.md) — Requisitos funcionais, não funcionais e regras de negócio aprovados (v1.0).
* 🗺️ [`ROADMAP.md`](./ROADMAP.md) — Fases de desenvolvimento e ordem de construção do MVP.
* 📝 [`NOTAS.md`](./NOTAS.md) — Arquitetura, decisões técnicas e histórico de soluções.
* 📜 [`CLAUDE.md`](./CLAUDE.md) — Regras de conduta, segurança e protocolos de sessão.

---

## 🛠️ Stack Tecnológica

* **Frontend:** React 18, Vite 8, CSS3 Moderno e Responsivo.
* **Domínio & Regras:** Camada de regras puras desacoplada da UI (POO).
* **Armazenamento:** LocalStorage estruturado com gerador de sementes sintéticas (*seeder*).
* **Testes:** Vitest e Testing Library.
