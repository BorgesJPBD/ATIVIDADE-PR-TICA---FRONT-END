import { mockVeiculos } from './mockVeiculos';

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
