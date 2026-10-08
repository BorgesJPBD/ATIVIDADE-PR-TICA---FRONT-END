// Itens do checklist diário, divididos em 3 seções (12 itens no total).

/** @type {import('../types').SecaoVerificacao[]} */
export const secoesChecklist = [
  {
    id: 'documentacao',
    titulo: 'Documentação',
    itens: [
      { id: 'cnh', nome: 'CNH', descricao: 'Válida e na categoria do veículo' },
      { id: 'crlv', nome: 'CRLV', descricao: 'Documento do ano vigente dentro do veículo' },
    ],
  },
  {
    id: 'seguranca',
    titulo: 'Segurança',
    itens: [
      { id: 'freios', nome: 'Freios', descricao: 'Pedal firme e sem ruído ao frear' },
      { id: 'pneus', nome: 'Pneus', descricao: 'Calibragem, sulcos e estepe em ordem' },
      { id: 'farois', nome: 'Faróis', descricao: 'Farol baixo, alto, setas e luz de freio' },
      { id: 'cinto', nome: 'Cinto', descricao: 'Trava e recolhe normalmente' },
      { id: 'extintor', nome: 'Extintor', descricao: 'Carregado, lacrado e na validade' },
    ],
  },
  {
    id: 'operacional',
    titulo: 'Operacional',
    itens: [
      { id: 'oleo', nome: 'Nível de óleo', descricao: 'Entre o mínimo e o máximo da vareta' },
      { id: 'agua', nome: 'Água', descricao: 'Reservatório do radiador no nível' },
      { id: 'combustivel', nome: 'Combustível', descricao: 'Suficiente para a rota do dia' },
      { id: 'buzina', nome: 'Buzina', descricao: 'Funcionando' },
      { id: 'limpador', nome: 'Limpador', descricao: 'Palhetas limpando sem falhas' },
    ],
  },
];
