import type { Veiculo } from '@/types';

export interface ContagemStatus {
  total: number;
  aptos: number;
  inaptos: number;
  pendentes: number;
}

export function contarPorStatus(veiculos: Veiculo[]): ContagemStatus {
  return {
    total: veiculos.length,
    aptos: veiculos.filter((v) => v.status === 'Apto').length,
    inaptos: veiculos.filter((v) => v.status === 'Inapto').length,
    pendentes: veiculos.filter((v) => v.status === 'Pendente').length,
  };
}
