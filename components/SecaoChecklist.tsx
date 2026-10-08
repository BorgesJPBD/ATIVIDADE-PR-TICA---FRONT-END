import type { RespostasChecklist, SecaoVerificacao } from '@/types';
import ItemChecklist from './ItemChecklist';

interface SecaoChecklistProps {
  secao: SecaoVerificacao;
  respostas: RespostasChecklist;
  onAlterar: (itemId: string, aprovado: boolean) => void;
}

export default function SecaoChecklist({ secao, respostas, onAlterar }: SecaoChecklistProps) {
  const total = secao.itens.length;
  const aprovados = secao.itens.filter((item) => respostas[item.id]).length;
  const idTitulo = `secao-${secao.id}`;

  return (
    <section className="secao-checklist" role="group" aria-labelledby={idTitulo}>
      <div className="secao-cabecalho">
        <h2 className="titulo-secao" id={idTitulo}>
          {secao.titulo}
        </h2>
        <span
          className={
            aprovados < total ? 'secao-contagem secao-contagem--alerta' : 'secao-contagem'
          }
        >
          {aprovados} de {total} OK
        </span>
      </div>

      <div className="secao-itens">
        {secao.itens.map((item) => (
          <ItemChecklist
            key={item.id}
            item={item}
            aprovado={respostas[item.id]}
            onAlterar={onAlterar}
          />
        ))}
      </div>
    </section>
  );
}
