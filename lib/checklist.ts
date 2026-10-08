import type {
  ResultadoChecklist,
  RespostasChecklist,
  Revisao,
  SecaoVerificacao,
} from '@/types';

export function criarRespostasIniciais(secoes: SecaoVerificacao[]): RespostasChecklist {
  const respostas: RespostasChecklist = {};
  secoes.forEach((secao) => {
    secao.itens.forEach((item) => {
      respostas[item.id] = true;
    });
  });
  return respostas;
}

export function calcularStatus(respostas: RespostasChecklist): ResultadoChecklist {
  const algumReprovado = Object.values(respostas).some((aprovado) => !aprovado);
  return algumReprovado ? 'Inapto' : 'Apto';
}

export function listarItensReprovados(
  secoes: SecaoVerificacao[],
  respostas: RespostasChecklist,
): string[] {
  return secoes
    .flatMap((secao) => secao.itens)
    .filter((item) => respostas[item.id] === false)
    .map((item) => item.nome);
}

export interface ItemRanking {
  item: string;
  quantidade: number;
  percentual: number;
}

export function calcularRankingReprovacoes(revisoes: Revisao[]): ItemRanking[] {
  const contagem: Record<string, number> = {};

  revisoes.forEach((revisao) => {
    revisao.itensReprovados.forEach((nome) => {
      contagem[nome] = (contagem[nome] ?? 0) + 1;
    });
  });

  const totalReprovacoes = Object.values(contagem).reduce((soma, n) => soma + n, 0);
  if (totalReprovacoes === 0) return [];

  return Object.entries(contagem)
    .map(([item, quantidade]) => ({
      item,
      quantidade,
      percentual: Math.round((quantidade / totalReprovacoes) * 100),
    }))
    .sort((a, b) => b.quantidade - a.quantidade || a.item.localeCompare(b.item));
}
