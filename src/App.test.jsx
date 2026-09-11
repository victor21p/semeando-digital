import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Renderiza o cabeçalho oficial do Semeando Digital', () => {
  render(<App />);
  const titleElement = screen.getByText(/Semeando Digital/i);
  expect(titleElement).toBeDefined();

  const instElement = screen.getByText(/Centro Educacional Semeando/i);
  expect(instElement).toBeDefined();

  const lgpdBadge = screen.getByText(/100% Dados Sintéticos/i);
  expect(lgpdBadge).toBeDefined();
});
