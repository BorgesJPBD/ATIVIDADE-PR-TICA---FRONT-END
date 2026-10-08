import type { ItemVerificacao } from '@/types';

interface ItemChecklistProps {
  item: ItemVerificacao;
  aprovado: boolean;
  onAlterar: (itemId: string, aprovado: boolean) => void;
}

export default function ItemChecklist({ item, aprovado, onAlterar }: ItemChecklistProps) {
  return (
    <label className={aprovado ? 'item' : 'item item--reprovado'}>
      <span className="item-texto">
        <span className="item-nome">{item.nome}</span>
        <span className="item-descricao">{item.descricao}</span>
      </span>
      <span className="item-estado">{aprovado ? 'OK' : 'Reprovado'}</span>
      <input
        type="checkbox"
        className="interruptor"
        checked={aprovado}
        onChange={(evento) => onAlterar(item.id, evento.target.checked)}
      />
    </label>
  );
}
