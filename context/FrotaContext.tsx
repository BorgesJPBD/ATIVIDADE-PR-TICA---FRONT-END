'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { mockVeiculos } from '@/data/mockVeiculos';
import { mockRevisoes } from '@/data/mockRevisoes';
import { chaveDoDia } from '@/lib/datas';
import type { ResultadoChecklist, Revisao, Veiculo } from '@/types';

const CHAVE_STORAGE = 'checklist-frota:v1';

const veiculosIniciais = mockVeiculos as Veiculo[];
const revisoesIniciais = mockRevisoes as Revisao[];

interface DadosSalvos {
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
  pronto: boolean;
  salvarChecklist: (dados: NovoChecklist) => void;
  restaurarDados: () => void;
}

const FrotaContext = createContext<FrotaContextValue | null>(null);

export function FrotaProvider({ children }: { children: React.ReactNode }) {
  const [veiculos, setVeiculos] = useState<Veiculo[]>(veiculosIniciais);
  const [revisoes, setRevisoes] = useState<Revisao[]>(revisoesIniciais);
  const [pronto, setPronto] = useState(false);

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
    } catch {}
    setPronto(true);
  }, []);

  useEffect(() => {
    if (!pronto) return;
    try {
      const dados: DadosSalvos = { dia: chaveDoDia(), veiculos, revisoes };
      localStorage.setItem(CHAVE_STORAGE, JSON.stringify(dados));
    } catch {}
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

    setVeiculos((atuais) =>
      atuais.map((v) =>
        v.id === veiculo.id ? { ...v, status: dados.status, ultimaRevisao: agora } : v,
      ),
    );
    setRevisoes((atuais) => [revisao, ...atuais]);
  }

  function restaurarDados() {
    setVeiculos(veiculosIniciais);
    setRevisoes(revisoesIniciais);
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
