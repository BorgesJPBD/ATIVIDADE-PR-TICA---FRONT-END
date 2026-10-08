import { mockVeiculos } from './mockVeiculos';

// Checklists que "já foram feitos hoje" antes de abrir o sistema.
// Gerados a partir dos veículos Aptos/Inaptos do mock, para os dados baterem.

/** Itens reprovados e observações dos veículos inaptos */
const reprovacoes = {
  3: {
    itens: ['Freios', 'Pneus', 'Faróis'],
    observacoes: 'Pedal de freio baixo, pneu traseiro esquerdo careca e farol direito queimado.',
  },
  6: {
    itens: ['Pneus', 'Extintor'],
    observacoes: 'Estepe furado e extintor com validade vencida.',
  },
};

/** @type {import('../types').Revisao[]} */
export const mockRevisoes = mockVeiculos
  .filter((veiculo) => veiculo.status !== 'Pendente')
  .map((veiculo) => ({
    id: `rev-mock-${veiculo.id}`,
    veiculoId: veiculo.id,
    placa: veiculo.placa,
    modelo: veiculo.modelo,
    motorista: veiculo.motorista,
    dataHora: veiculo.ultimaRevisao,
    status: veiculo.status === 'Inapto' ? 'Inapto' : 'Apto',
    itensReprovados: reprovacoes[veiculo.id]?.itens ?? [],
    observacoes: reprovacoes[veiculo.id]?.observacoes ?? '',
    fotoHodometro: null,
  }));
