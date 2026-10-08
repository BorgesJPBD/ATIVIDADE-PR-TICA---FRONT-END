import type { StatusVeiculo } from '@/types';

const classes: Record<StatusVeiculo, string> = {
  Apto: 'selo selo--apto',
  Inapto: 'selo selo--inapto',
  Pendente: 'selo selo--pendente',
};

export default function StatusBadge({ status }: { status: StatusVeiculo }) {
  return <span className={classes[status]}>{status}</span>;
}
