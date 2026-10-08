'use client';

import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Carregando from '@/components/Carregando';
import { IconeVoltar } from '@/components/Icones';
import Placa from '@/components/Placa';
import SecaoChecklist from '@/components/SecaoChecklist';
import StatusBadge from '@/components/StatusBadge';
import { useFrota } from '@/context/FrotaContext';
import { secoesChecklist } from '@/data/itensChecklist';
import { calcularStatus, criarRespostasIniciais, listarItensReprovados } from '@/lib/checklist';

interface FotoSelecionada {
  nome: string;
  url: string;
}

const totalItens = secoesChecklist.reduce((soma, secao) => soma + secao.itens.length, 0);

export default function ChecklistPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { veiculos, pronto, salvarChecklist } = useFrota();

  const [respostas, setRespostas] = useState(() => criarRespostasIniciais(secoesChecklist));
  const [observacoes, setObservacoes] = useState('');
  const [foto, setFoto] = useState<FotoSelecionada | null>(null);

  useEffect(() => {
    return () => {
      if (foto) URL.revokeObjectURL(foto.url);
    };
  }, [foto]);

  if (!pronto) return <Carregando />;

  const veiculo = veiculos.find((v) => v.id === Number(id));

  if (!veiculo) {
    return (
      <div className="vazio">
        <p>Não encontramos o veículo de código {id}.</p>
        <p className="vazio-dica">Escolha um veículo na garagem para iniciar o checklist.</p>
        <Link href="/" className="botao botao--primario">
          Voltar para a garagem
        </Link>
      </div>
    );
  }

  const status = calcularStatus(respostas);
  const reprovados = listarItensReprovados(secoesChecklist, respostas);

  const alterarItem = (itemId: string, aprovado: boolean) => {
    setRespostas((atuais) => ({ ...atuais, [itemId]: aprovado }));
  };

  const escolherFoto = (evento: ChangeEvent<HTMLInputElement>) => {
    const arquivo = evento.target.files?.[0];
    setFoto(arquivo ? { nome: arquivo.name, url: URL.createObjectURL(arquivo) } : null);
  };

  const finalizarRevisao = (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    salvarChecklist({
      veiculoId: veiculo.id,
      status,
      itensReprovados: reprovados,
      observacoes: observacoes.trim(),
      fotoHodometro: foto?.nome ?? null,
    });

    alert('Checklist salvo!');
    router.push('/relatorios');
  };

  return (
    <>
      <Link href="/" className="voltar">
        <IconeVoltar />
        Garagem
      </Link>

      <div className="checklist-veiculo">
        <Placa placa={veiculo.placa} tamanho="grande" />
        <div>
          <h1 className="titulo-pagina">{veiculo.modelo}</h1>
          <p className="subtitulo-pagina">Motorista: {veiculo.motorista}</p>
        </div>
      </div>

      <p className="instrucao">
        Todos os itens começam marcados como OK. Desmarque o que estiver com problema: um único
        item reprovado deixa o veículo Inapto.
      </p>

      <form className="formulario-checklist" onSubmit={finalizarRevisao}>
        {secoesChecklist.map((secao) => (
          <SecaoChecklist
            key={secao.id}
            secao={secao}
            respostas={respostas}
            onAlterar={alterarItem}
          />
        ))}

        <div className="campo">
          <label htmlFor="observacoes" className="campo-rotulo">
            Observações
          </label>
          <p className="campo-ajuda" id="observacoes-ajuda">
            Descreva o problema encontrado ou qualquer detalhe para a manutenção.
          </p>
          <textarea
            id="observacoes"
            className="campo-texto"
            aria-describedby="observacoes-ajuda"
            placeholder="Ex.: pneu dianteiro direito com bolha na lateral"
            value={observacoes}
            onChange={(evento) => setObservacoes(evento.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="foto-hodometro" className="campo-rotulo">
            Foto do hodômetro
          </label>
          <p className="campo-ajuda" id="foto-ajuda">
            Fotografe o painel mostrando a quilometragem atual.
          </p>
          <input
            id="foto-hodometro"
            type="file"
            accept="image/*"
            className="campo-arquivo"
            aria-describedby="foto-ajuda"
            onChange={escolherFoto}
          />
          {foto && (
            <div className="foto-previa">
              <img src={foto.url} alt="Prévia da foto do hodômetro" />
              <span>{foto.nome}</span>
            </div>
          )}
        </div>

        <div
          className={status === 'Inapto' ? 'barra-acoes barra-acoes--inapto' : 'barra-acoes'}
        >
          <div className="resultado" aria-live="polite">
            <span className="resultado-linha">
              Status do veículo: <StatusBadge status={status} />
            </span>
            <span className="resultado-detalhe">
              {status === 'Apto'
                ? `Todos os ${totalItens} itens OK. Liberado para sair.`
                : `Reprovado em: ${reprovados.join(', ')}.`}
            </span>
          </div>
          <button type="submit" className="botao botao--primario botao--grande">
            Finalizar Revisão
          </button>
        </div>
      </form>
    </>
  );
}
