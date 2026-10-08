// Funções de data usadas pelos mocks e pelas telas.

/** Chave do dia no fuso local, no formato AAAA-MM-DD */
export function chaveDoDia(data: Date = new Date()): string {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

/** Data ISO de hoje no horário informado, ex.: hojeAs('06:42') */
export function hojeAs(hora: string): string {
  const [h, m] = hora.split(':').map(Number);
  const data = new Date();
  data.setHours(h, m, 0, 0);
  return data.toISOString();
}

/** Data ISO de N dias atrás no horário informado */
export function diasAtras(dias: number, hora = '17:30'): string {
  const [h, m] = hora.split(':').map(Number);
  const data = new Date();
  data.setDate(data.getDate() - dias);
  data.setHours(h, m, 0, 0);
  return data.toISOString();
}

export function ehHoje(iso: string): boolean {
  return chaveDoDia(new Date(iso)) === chaveDoDia();
}

export function formatarHora(iso: string): string {
  return new Date(iso).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

/** "Hoje às 06:42", "Ontem às 17:30" ou "05/10 às 17:30" */
export function formatarUltimaRevisao(iso: string): string {
  const data = new Date(iso);
  const ontem = new Date();
  ontem.setDate(ontem.getDate() - 1);

  if (ehHoje(iso)) return `Hoje às ${formatarHora(iso)}`;
  if (chaveDoDia(data) === chaveDoDia(ontem)) return `Ontem às ${formatarHora(iso)}`;
  const dia = data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  return `${dia} às ${formatarHora(iso)}`;
}

/** "Quarta-feira, 7 de outubro" */
export function dataDeHojePorExtenso(): string {
  const texto = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
