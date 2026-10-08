'use client';

import { useState } from 'react';
import CardVeiculo from '@/components/CardVeiculo';
import Carregando from '@/components/Carregando';
import { IconeBusca } from '@/components/Icones';
import ResumoFrota from '@/components/ResumoFrota';
import { useFrota } from '@/context/FrotaContext';
import { contarPorStatus } from '@/lib/frota';

/** Remove espaços, hífen etc. para "rta-2f45" encontrar "RTA2F45" */
function normalizarPlaca(texto: string) {
  return texto.toLowerCase().replace(/[^a-z0-9]/g, '');
}

// TELA 1 - Garagem / Lista de veículos
export default function GaragemPage() {
  const { veiculos, pronto } = useFrota();
  const [busca, setBusca] = useState('');

  if (!pronto) return <Carregando />;

  // Contadores calculados a partir do array
  const contagem = contarPorStatus(veiculos);

  // Filtro em tempo real por placa ou modelo
  const termo = busca.trim().toLowerCase();
  const veiculosFiltrados = veiculos.filter((veiculo) => {
    if (!termo) return true;
    const termoPlaca = normalizarPlaca(termo);
    const achouPlaca = termoPlaca !== '' && normalizarPlaca(veiculo.placa).includes(termoPlaca);
    const achouModelo = veiculo.modelo.toLowerCase().includes(termo);
    return achouPlaca || achouModelo;
  });

  return (
    <>
      <div className="cabecalho-pagina">
        <div>
          <h1 className="titulo-pagina">Garagem</h1>
          <p className="subtitulo-pagina">
            {contagem.pendentes > 0
              ? `${contagem.pendentes} de ${contagem.total} veículos ainda precisam do checklist de hoje.`
              : 'Todos os veículos já passaram pelo checklist de hoje.'}
          </p>
        </div>
      </div>

      <ResumoFrota contagem={contagem} />

      <label className="busca">
        <span className="visualmente-oculto">Buscar veículo por placa ou modelo</span>
        <IconeBusca />
        <input
          type="search"
          placeholder="Buscar por placa ou modelo"
          value={busca}
          onChange={(evento) => setBusca(evento.target.value)}
          autoComplete="off"
        />
      </label>

      <p className="busca-resultado" aria-live="polite">
        {termo
          ? `${veiculosFiltrados.length} de ${veiculos.length} veículos encontrados`
          : `${veiculos.length} veículos na frota`}
      </p>

      {veiculosFiltrados.length > 0 ? (
        <div className="grade-veiculos">
          {veiculosFiltrados.map((veiculo) => (
            <CardVeiculo key={veiculo.id} veiculo={veiculo} />
          ))}
        </div>
      ) : (
        <div className="vazio">
          <p>Nenhum veículo com placa ou modelo “{busca.trim()}”.</p>
          <p className="vazio-dica">Confira a placa ou tente só parte do modelo, como “Strada”.</p>
          <button type="button" className="botao botao--secundario" onClick={() => setBusca('')}>
            Limpar busca
          </button>
        </div>
      )}
    </>
  );
}
