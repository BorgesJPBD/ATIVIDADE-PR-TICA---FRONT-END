import type { ItemRanking } from '@/lib/checklist';

/** Gráfico de barras sem biblioteca: cada barra é uma div com width em % */
export default function GraficoReprovacoes({ ranking }: { ranking: ItemRanking[] }) {
  if (ranking.length === 0) {
    return <p className="sem-dados">Nenhum item reprovado hoje.</p>;
  }

  return (
    <ul className="grafico">
      {ranking.map(({ item, quantidade, percentual }) => (
        <li
          key={item}
          className="grafico-linha"
          aria-label={`${item}: ${percentual}% das reprovações (${quantidade})`}
        >
          <span className="grafico-rotulo" aria-hidden="true">
            {item}
          </span>
          <div className="grafico-trilho" aria-hidden="true">
            <div className="grafico-barra" style={{ width: `${percentual}%` }} />
          </div>
          <span className="grafico-valor" aria-hidden="true">
            {percentual}% <small>({quantidade})</small>
          </span>
        </li>
      ))}
    </ul>
  );
}
