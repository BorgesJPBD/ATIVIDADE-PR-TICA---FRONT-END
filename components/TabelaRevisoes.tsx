import { formatarHora } from '@/lib/datas';
import type { Revisao } from '@/types';
import Placa from './Placa';
import StatusBadge from './StatusBadge';

export default function TabelaRevisoes({ revisoes }: { revisoes: Revisao[] }) {
  if (revisoes.length === 0) {
    return <p className="sem-dados">Nenhum checklist finalizado hoje.</p>;
  }

  return (
    <div className="tabela-rolagem">
      <table className="tabela">
        <thead>
          <tr>
            <th scope="col">Placa</th>
            <th scope="col">Motorista</th>
            <th scope="col">Horário</th>
            <th scope="col">Status</th>
            <th scope="col">Quem reprovou</th>
          </tr>
        </thead>
        <tbody>
          {revisoes.map((revisao) => {
            const temReprovacao = revisao.itensReprovados.length > 0;
            return (
              <tr key={revisao.id}>
                <td data-rotulo="Placa">
                  <Placa placa={revisao.placa} tamanho="pequena" />
                </td>
                <td data-rotulo="Motorista">{revisao.motorista}</td>
                <td data-rotulo="Horário" className="celula-hora">
                  {formatarHora(revisao.dataHora)}
                </td>
                <td data-rotulo="Status">
                  <StatusBadge status={revisao.status} />
                </td>
                <td
                  data-rotulo="Quem reprovou"
                  className={
                    temReprovacao
                      ? 'celula-reprovados'
                      : 'celula-reprovados celula-reprovados--vazia'
                  }
                >
                  {temReprovacao ? revisao.itensReprovados.join(', ') : 'Nenhum item'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
