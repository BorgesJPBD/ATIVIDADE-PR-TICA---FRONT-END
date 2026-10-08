export type StatusVeiculo = 'Apto' | 'Inapto' | 'Pendente';

export type ResultadoChecklist = Exclude<StatusVeiculo, 'Pendente'>;

export interface Veiculo {
  id: number;
  placa: string;
  modelo: string;
  motorista: string;
  status: StatusVeiculo;
  ultimaRevisao: string;
}

export interface ItemVerificacao {
  id: string;
  nome: string;
  descricao: string;
}

export interface SecaoVerificacao {
  id: string;
  titulo: string;
  itens: ItemVerificacao[];
}

export type RespostasChecklist = Record<string, boolean>;

export interface Revisao {
  id: string;
  veiculoId: number;
  placa: string;
  modelo: string;
  motorista: string;
  dataHora: string;
  status: ResultadoChecklist;
  itensReprovados: string[];
  observacoes: string;
  fotoHodometro: string | null;
}
