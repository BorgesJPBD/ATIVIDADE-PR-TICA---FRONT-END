import { diasAtras, hojeAs } from '../lib/datas';

// Frota mockada: 10 veículos da empresa.
// As datas são relativas a "hoje" para o protótipo sempre parecer atual.

/** @type {import('../types').Veiculo[]} */
export const mockVeiculos = [
  {
    id: 1,
    placa: 'RTA2F45',
    modelo: 'Fiat Strada Freedom',
    motorista: 'Carlos Menezes',
    status: 'Apto',
    ultimaRevisao: hojeAs('06:12'),
  },
  {
    id: 2,
    placa: 'QWE1J23',
    modelo: 'VW Saveiro Robust',
    motorista: 'Juliana Prado',
    status: 'Apto',
    ultimaRevisao: hojeAs('06:25'),
  },
  {
    id: 3,
    placa: 'SBK4C87',
    modelo: 'Renault Master Furgão',
    motorista: 'Marcos Vieira',
    status: 'Inapto',
    ultimaRevisao: hojeAs('06:31'),
  },
  {
    id: 4,
    placa: 'PXL7D02',
    modelo: 'Mercedes-Benz Sprinter 416',
    motorista: 'Ana Beatriz Lima',
    status: 'Apto',
    ultimaRevisao: hojeAs('06:40'),
  },
  {
    id: 5,
    placa: 'OTR3H59',
    modelo: 'Toyota Hilux SR',
    motorista: 'Rafael Toledo',
    status: 'Pendente',
    ultimaRevisao: diasAtras(1, '17:50'),
  },
  {
    id: 6,
    placa: 'RFN8A14',
    modelo: 'Chevrolet S10 LT',
    motorista: 'Fernanda Rocha',
    status: 'Inapto',
    ultimaRevisao: hojeAs('06:58'),
  },
  {
    id: 7,
    placa: 'SDA5E66',
    modelo: 'Fiat Fiorino Endurance',
    motorista: 'Paulo Henrique Souza',
    status: 'Pendente',
    ultimaRevisao: diasAtras(1, '18:05'),
  },
  {
    id: 8,
    placa: 'QJM9B31',
    modelo: 'VW Delivery 9.170',
    motorista: 'Rogério Batista',
    status: 'Apto',
    ultimaRevisao: hojeAs('07:05'),
  },
  {
    id: 9,
    placa: 'RUV6G78',
    modelo: 'Iveco Daily 35-150',
    motorista: 'Luana Martins',
    status: 'Pendente',
    ultimaRevisao: diasAtras(2, '16:40'),
  },
  {
    id: 10,
    placa: 'SCT0K25',
    modelo: 'Fiat Toro Volcano',
    motorista: 'Diego Almeida',
    status: 'Apto',
    ultimaRevisao: hojeAs('07:14'),
  },
];
