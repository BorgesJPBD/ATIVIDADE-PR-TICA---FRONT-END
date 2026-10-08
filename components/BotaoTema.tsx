'use client';

import { useEffect, useState } from 'react';
import { IconeLua, IconeSol } from './Icones';

type Tema = 'claro' | 'escuro';

/** Botão de Dark Mode: troca o atributo data-tema do <html> e lembra a escolha */
export default function BotaoTema() {
  const [tema, setTema] = useState<Tema | null>(null);

  useEffect(() => {
    setTema(document.documentElement.dataset.tema === 'escuro' ? 'escuro' : 'claro');
  }, []);

  function alternarTema() {
    const novoTema: Tema = tema === 'escuro' ? 'claro' : 'escuro';
    document.documentElement.dataset.tema = novoTema;
    try {
      localStorage.setItem('tema', novoTema);
    } catch {
      // sem localStorage o tema vale só até recarregar
    }
    setTema(novoTema);
  }

  const escuro = tema === 'escuro';
  const rotulo = escuro ? 'Usar tema claro' : 'Usar tema escuro';

  return (
    <button
      type="button"
      className="botao-tema"
      onClick={alternarTema}
      aria-label={rotulo}
      title={rotulo}
    >
      {escuro ? <IconeSol /> : <IconeLua />}
    </button>
  );
}
