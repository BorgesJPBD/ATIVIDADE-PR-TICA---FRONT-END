'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BotaoTema from './BotaoTema';
import { IconeMarca } from './Icones';

const links = [
  { href: '/', rotulo: 'Garagem' },
  { href: '/relatorios', rotulo: 'Relatórios' },
];

export default function Header() {
  const pathname = usePathname();

  function estaAtivo(href: string) {
    if (href === '/') return pathname === '/' || pathname.startsWith('/checklist');
    return pathname.startsWith(href);
  }

  return (
    <header className="topo">
      <div className="container topo-interno">
        <Link href="/" className="marca" aria-label="Checklist de Frota, ir para a garagem">
          <IconeMarca />
          <span className="marca-texto">Checklist de Frota</span>
        </Link>

        <nav className="nav" aria-label="Principal">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={estaAtivo(link.href) ? 'page' : undefined}
            >
              {link.rotulo}
            </Link>
          ))}
        </nav>

        <BotaoTema />
      </div>
    </header>
  );
}
