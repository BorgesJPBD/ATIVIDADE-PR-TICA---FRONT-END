'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { mockVeiculos } from '@/data/mockVeiculos';
import { mockRevisoes } from '@/data/mockRevisoes';
import { chaveDoDia } from '@/lib/datas';
import type { ResultadoChecklist, Revisao, Veiculo } from '@/types';

const CHAVE_STORAGE = 'checklist-frota:v1';

interface DadosSalvos {
  /** Dia em que os dados foram salvos: num dia novo, voltamos ao mock */
  dia: string;
  veiculos: Veiculo[];
  revisoes: Revisao[];
}

export interface NovoChecklist {
  veiculoId: number;
  status: ResultadoChecklist;
  itensReprovados: string[];
  observacoes: string;
  fotoHodometro: string | null;
}

interface FrotaContextValue {
  veiculos: Veiculo[];
  revisoes: Revisao[];
  /** true depois de ler o localStorage (evita piscar dados errados) */
  pronto: boolean;
  salvarChecklist: (dados: NovoChecklist) => void;
  restaurarDados: () => void;
}

const FrotaContext = createContext<FrotaContextValue | null>(null);

export function FrotaProvider({ children }: { children: React.ReactNode }) {
  const [veiculos, setVeiculos] = useState<Veiculo[]>(mockVeiculos);
  const [revisoes, setRevisoes] = useState<Revisao[]>(mockRevisoes);
  const [pronto, setPronto] = useState(false);

  // 1) Ao abrir o app, recupera o que foi salvo hoje no localStorage
  useEffect(() => {
    try {
      const texto = localStorage.getItem(CHAVE_STORAGE);
      if (texto) {
        const salvo: DadosSalvos = JSON.parse(texto);
        if (salvo.dia === chaveDoDia()) {
          setVeiculos(salvo.veiculos);
          setRevisoes(salvo.revisoes);
        }
      }
    } catch {
      // localStorage indisponível ou corrompido: segue com o mock
    }
    setPronto(true);
  }, []);

  // 2) Sempre que algo muda, salva no localStorage para persistir entre as telas
  useEffect(() => {
    if (!pronto) return;
    try {
      const dados: DadosSalvos = { dia: chaveDoDia(), veiculos, revisoes };
      localStorage.setItem(CHAVE_STORAGE, JSON.stringify(dados));
    } catch {
      // sem persistência, mas o estado em memória continua funcionando
    }
  }, [pronto, veiculos, revisoes]);

  function salvarChecklist(dados: NovoChecklist) {
    const veiculo = veiculos.find((v) => v.id === dados.veiculoId);
    if (!veiculo) return;

    const agora = new Date().toISOString();

    const revisao: Revisao = {
      id: `rev-${Date.now()}`,
      veiculoId: veiculo.id,
      placa: veiculo.placa,
      modelo: veiculo.modelo,
      motorista: veiculo.motorista,
      dataHora: agora,
      status: dados.status,
      itensReprovados: dados.itensReprovados,
      observacoes: dados.observacoes,
      fotoHodometro: dados.fotoHodometro,
    };

    // Atualiza o status do veículo e registra a revisão no histórico
    setVeiculos((atuais) =>
      atuais.map((v) =>
        v.id === veiculo.id ? { ...v, status: dados.status, ultimaRevisao: agora } : v,
      ),
    );
    setRevisoes((atuais) => [revisao, ...atuais]);
  }

  function restaurarDados() {
    setVeiculos(mockVeiculos);
    setRevisoes(mockRevisoes);
  }

  return (
    <FrotaContext.Provider value={{ veiculos, revisoes, pronto, salvarChecklist, restaurarDados }}>
      {children}
    </FrotaContext.Provider>
  );
}

export function useFrota() {
  const contexto = useContext(FrotaContext);
  if (!contexto) {
    throw new Error('useFrota precisa estar dentro de <FrotaProvider>');
  }
  return contexto;
}
