import Link from 'next/link';
import { formatarUltimaRevisao } from '@/lib/datas';
import type { Veiculo } from '@/types';
import { IconePessoa, IconeRelogio } from './Icones';
import Placa from './Placa';
import StatusBadge from './StatusBadge';

export default function CardVeiculo({ veiculo }: { veiculo: Veiculo }) {
  return (
    <article className={`card-veiculo card-veiculo--${veiculo.status.toLowerCase()}`}>
      <div className="card-cabecalho">
        <h2 className="card-modelo">{veiculo.modelo}</h2>
        <StatusBadge status={veiculo.status} />
      </div>

      <Placa placa={veiculo.placa} />

      <ul className="card-dados">
        <li>
          <IconePessoa />
          <span className="visualmente-oculto">Motorista:</span>
          {veiculo.motorista}
        </li>
        <li>
          <IconeRelogio />
          <span className="visualmente-oculto">Última revisão:</span>
          {formatarUltimaRevisao(veiculo.ultimaRevisao)}
        </li>
      </ul>

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
