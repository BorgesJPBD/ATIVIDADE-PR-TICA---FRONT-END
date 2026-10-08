import Link from 'next/link';
import { formatarUltimaRevisao } from '@/lib/datas';
import type { Veiculo } from '@/types';
import Placa from './Placa';
import StatusBadge from './StatusBadge';

export default function CardVeiculo({ veiculo }: { veiculo: Veiculo }) {
  return (
    <article className="card-veiculo">
      <div className="card-topo">
        <Placa placa={veiculo.placa} />
        <StatusBadge status={veiculo.status} />
      </div>

      <h2 className="card-modelo">{veiculo.modelo}</h2>

      <dl className="card-dados">
        <div>
          <dt>Motorista</dt>
          <dd>{veiculo.motorista}</dd>
        </div>
        <div>
          <dt>Última revisão</dt>
          <dd>{formatarUltimaRevisao(veiculo.ultimaRevisao)}</dd>
        </div>
      </dl>

      <Link
        href={`/checklist/${veiculo.id}`}
        className="botao botao--primario botao--bloco"
        aria-label={`Iniciar Checklist do veículo ${veiculo.placa}`}
      >
        Iniciar Checklist
      </Link>
    </article>
  );
}
