import type { CSSProperties } from 'react';

interface KpiCardProps {
  titulo: string;
  valor: string | number;
  detalhe: string;
  tom: 'apto' | 'inapto' | 'pendente';
  progresso?: number;
}

export default function KpiCard({ titulo, valor, detalhe, tom, progresso }: KpiCardProps) {
  return (
    <article className={`kpi kpi--${tom}`}>
      <div className="kpi-texto">
        <h2 className="kpi-titulo">{titulo}</h2>
        <p className="kpi-valor">{valor}</p>
        <p className="kpi-detalhe">{detalhe}</p>
      </div>
      {progresso !== undefined && (
        <div
          className="kpi-anel"
          style={{ '--progresso': `${progresso}%` } as CSSProperties}
          aria-hidden="true"
        />
      )}
    </article>
  );
}
