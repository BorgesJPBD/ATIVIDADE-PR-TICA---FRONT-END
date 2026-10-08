export type StatusVeiculo = 'Apto' | 'Inapto' | 'Pendente';

/** Resultado possível de um checklist finalizado */
export type ResultadoChecklist = Exclude<StatusVeiculo, 'Pendente'>;

export interface Veiculo {
  id: number;
  placa: string;
  modelo: string;
  motorista: string;
  status: StatusVeiculo;
  /** Data/hora ISO da última revisão */
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

/** Respostas do checklist: true = OK (marcado), false = reprovado (desmarcado) */
export type RespostasChecklist = Record<string, boolean>;

export interface Revisao {
  id: string;
  veiculoId: number;
  placa: string;
  modelo: string;
  motorista: string;
  /** Data/hora ISO em que o checklist foi finalizado */
  dataHora: string;
  status: ResultadoChecklist;
  /** Nomes dos itens reprovados (ex.: ["Pneus", "Freios"]) */
  itensReprovados: string[];
  observacoes: string;
  /** Só o nome do arquivo escolhido: o protótipo não faz upload */
  fotoHodometro: string | null;
}
