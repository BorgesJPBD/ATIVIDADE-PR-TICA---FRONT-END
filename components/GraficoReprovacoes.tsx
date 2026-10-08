import type { ItemRanking } from '@/lib/checklist';

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
          <div className="grafico-topo" aria-hidden="true">
            <span className="grafico-rotulo">{item}</span>
            <span className="grafico-valor">
              {percentual}% <small>{quantidade === 1 ? '1 vez' : `${quantidade} vezes`}</small>
            </span>
          </div>
          <div className="grafico-trilho" aria-hidden="true">
            <div className="grafico-barra" style={{ width: `${percentual}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}
