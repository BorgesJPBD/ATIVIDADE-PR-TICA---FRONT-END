import type { StatusVeiculo } from '@/types';

const classes: Record<StatusVeiculo, string> = {
  Apto: 'selo selo--apto', // verde
  Inapto: 'selo selo--inapto', // vermelho
  Pendente: 'selo selo--pendente', // amarelo
};

/** Selo colorido do status: Verde = Apto, Vermelho = Inapto, Amarelo = Pendente */
export default function StatusBadge({ status }: { status: StatusVeiculo }) {
  return <span className={classes[status]}>{status}</span>;
}
