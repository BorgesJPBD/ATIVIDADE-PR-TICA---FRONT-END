interface KpiCardProps {
  titulo: string;
  valor: string | number;
  detalhe: string;
  tom: 'apto' | 'inapto' | 'pendente';
  /** Opcional: mostra uma barrinha de progresso (0 a 100) */
  progresso?: number;
}

export default function KpiCard({ titulo, valor, detalhe, tom, progresso }: KpiCardProps) {
  return (
    <article className={`kpi kpi--${tom}`}>
      <h2 className="kpi-titulo">{titulo}</h2>
      <p className="kpi-valor">{valor}</p>
      <p className="kpi-detalhe">{detalhe}</p>
      {progresso !== undefined && (
        <div className="kpi-trilho" aria-hidden="true">
          <span style={{ width: `${progresso}%` }} />
        </div>
      )}
    </article>
  );
}
