'use client';

import Carregando from '@/components/Carregando';
import GraficoReprovacoes from '@/components/GraficoReprovacoes';
import KpiCard from '@/components/KpiCard';
import TabelaRevisoes from '@/components/TabelaRevisoes';
import { useFrota } from '@/context/FrotaContext';
import { calcularRankingReprovacoes } from '@/lib/checklist';
import { dataDeHojePorExtenso, ehHoje } from '@/lib/datas';
import { contarPorStatus } from '@/lib/frota';

export default function RelatoriosPage() {
  const { veiculos, revisoes, pronto, restaurarDados } = useFrota();

  if (!pronto) return <Carregando />;

  const contagem = contarPorStatus(veiculos);
  const percentualApta =
    contagem.total > 0 ? Math.round((contagem.aptos / contagem.total) * 100) : 0;

  const revisoesHoje = revisoes
    .filter((revisao) => ehHoje(revisao.dataHora))
    .sort((a, b) => b.dataHora.localeCompare(a.dataHora));

  const ranking = calcularRankingReprovacoes(revisoesHoje);

  function exportarPdf() {
    alert('Relatório exportado!');
  }

  function confirmarRestauracao() {
    if (confirm('Apagar os checklists feitos e voltar aos dados de exemplo?')) {
      restaurarDados();
    }
  }

  return (
    <>
      <div className="cabecalho-pagina">
        <div>
          <h1 className="titulo-pagina">Painel da frota</h1>
          <p className="subtitulo-pagina">{dataDeHojePorExtenso()}</p>
        </div>
        <button type="button" className="botao botao--secundario" onClick={exportarPdf}>
          Exportar PDF
        </button>
      </div>

      <section className="kpis" aria-label="Indicadores de hoje">
        <KpiCard
          titulo="Frota apta"
          valor={`${percentualApta}%`}
          detalhe={`${contagem.aptos} de ${contagem.total} veículos liberados`}
          tom="apto"
          progresso={percentualApta}
        />
        <KpiCard
          titulo="Veículos inaptos hoje"
          valor={contagem.inaptos}
          detalhe={contagem.inaptos === 1 ? 'Precisa de manutenção' : 'Precisam de manutenção'}
          tom="inapto"
        />
        <KpiCard
          titulo="Checklists pendentes"
          valor={contagem.pendentes}
          detalhe="Veículos sem checklist hoje"
          tom="pendente"
        />
      </section>

      <div className="paineis">
        <section className="painel" aria-labelledby="titulo-historico">
          <div className="painel-cabecalho">
            <h2 className="titulo-secao" id="titulo-historico">
              Histórico de Revisões de Hoje
            </h2>
            <p className="descricao-secao">
              {revisoesHoje.length} {revisoesHoje.length === 1 ? 'checklist finalizado' : 'checklists finalizados'}
            </p>
          </div>
          <TabelaRevisoes revisoes={revisoesHoje} />
        </section>

        <section className="painel" aria-labelledby="titulo-grafico">
          <div className="painel-cabecalho">
            <h2 className="titulo-secao" id="titulo-grafico">
              Itens que mais reprovam
            </h2>
            <p className="descricao-secao">Participação de cada item nas reprovações de hoje</p>
          </div>
          <GraficoReprovacoes ranking={ranking} />
        </section>
      </div>

      <div className="rodape-relatorio">
        <span>Dados salvos neste navegador.</span>
        <button type="button" className="botao botao--texto" onClick={confirmarRestauracao}>
          Restaurar dados de exemplo
        </button>
      </div>
    </>
  );
}
