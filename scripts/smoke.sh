#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/.."

echo "=================================================="
echo "🧪 [SMOKE TEST] Verificando integridade da Fundação"
echo "=================================================="

TOTAL_OK=0
TOTAL_FALHAS=0

check() {
  local desc="$1"
  shift
  if "$@"; then
    echo "  ✅ OK: $desc"
    TOTAL_OK=$((TOTAL_OK + 1))
  else
    echo "  ❌ FALHA: $desc"
    TOTAL_FALHAS=$((TOTAL_FALHAS + 1))
  fi
}

check "Arquivo start.sh executável existe" test -x start.sh
check "Arquivo .env protegido pelo gitignore" git check-ignore -q .env
check "Módulo de domínio e regras existe" test -f src/domain/rules.js
check "Testes automatizados passam sem erro" npm run test -- --run
check "Build estático da aplicação compila" npm run build

echo "--------------------------------------------------"
echo "Resultado: OK $TOTAL_OK · FALHA $TOTAL_FALHAS"
echo "--------------------------------------------------"

if [ "$TOTAL_FALHAS" -gt 0 ]; then
  exit 1
fi
