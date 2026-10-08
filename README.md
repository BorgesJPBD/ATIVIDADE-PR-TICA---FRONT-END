# Saída Segura

Protótipo front-end de um sistema de checklist diário de revisão veicular, feito em **Next.js (App Router) + TypeScript**, com dados mockados. Sem back-end: o estado fica em um Context do React e é salvo no `localStorage` para não se perder ao trocar de tela ou recarregar.

A fonte Barlow vem do pacote `@fontsource/barlow`, instalado junto com as outras dependências, então o projeto funciona sem internet.

## Como rodar

Requisitos: Node.js 20 ou mais novo.

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Telas

| Rota | Arquivo | O que faz |
|---|---|---|
| `/` | `app/page.tsx` | Garagem: contadores (Aptos, Inaptos, Pendentes), busca em tempo real por placa ou modelo e grid de cards com o botão "Iniciar Checklist" |
| `/checklist/[id]` | `app/checklist/[id]/page.tsx` | Formulário com 12 itens em 3 seções, observações, foto do hodômetro e o status calculado na hora |
| `/relatorios` | `app/relatorios/page.tsx` | Painel do gestor: KPIs, histórico de revisões de hoje, gráfico de itens que mais reprovam e "Exportar PDF" |

## Estrutura

```
app/
  layout.tsx              Layout raiz: Header + FrotaProvider
  globals.css             Estilos (tema claro/escuro, responsivo)
  page.tsx                Tela 1
  checklist/[id]/page.tsx Tela 2
  relatorios/page.tsx     Tela 3
components/
  CardVeiculo.tsx         Card de veículo da garagem
  ItemChecklist.tsx       Um item do checklist (checkbox com visual de interruptor)
  SecaoChecklist.tsx      Seção do checklist com contagem "x de y OK"
  StatusBadge.tsx         Selo verde / vermelho / amarelo
  Placa.tsx               Placa do veículo
  ResumoFrota.tsx         Contadores do topo da garagem
  KpiCard.tsx             Card de indicador
  GraficoReprovacoes.tsx  Gráfico de barras só com divs (width em %)
  TabelaRevisoes.tsx      Tabela do histórico (vira lista no celular)
  Header.tsx, BotaoTema.tsx, Icones.tsx, Carregando.tsx
context/
  FrotaContext.tsx        Estado global (veículos + revisões) com localStorage
data/
  mockVeiculos.js         Array com os 10 veículos
  mockRevisoes.js         Checklists "já feitos hoje" (gerados a partir do mock)
  itensChecklist.js       Seções e itens do checklist
lib/
  checklist.ts            Regra Apto/Inapto e ranking de reprovações
  frota.ts                Contagem por status
  datas.ts                Formatação de datas
types/
  index.ts                Tipos (Veiculo, Revisao, ...)
```

## Como cada critério foi atendido

- **Navegação entre as 3 telas:** menu no Header (Garagem / Relatórios), botão "Iniciar Checklist" em cada card e redirecionamento para `/relatorios` ao finalizar.
- **Busca que filtra de verdade:** `useState` com o texto da busca e `veiculos.filter(...)` a cada digitação. Na placa, hífen e espaço são ignorados (`rta-2f` encontra `RTA2F45`).
- **Desmarcar 1 item torna Inapto:** todos os itens começam marcados (OK). A função `calcularStatus` em `lib/checklist.ts` devolve `Inapto` se qualquer item estiver desmarcado e `Apto` se todos estiverem marcados. O status aparece na barra fixa no rodapé e muda no mesmo clique.
- **Finalizar Revisão:** salva a revisão no Context (atualiza o status e a data da última revisão do veículo e adiciona a revisão no histórico), mostra `alert("Checklist salvo!")` e redireciona para `/relatorios`.
- **KPIs calculados, não chumbados:** `% de frota apta`, `inaptos` e `pendentes` saem de `contarPorStatus(veiculos)`. O gráfico conta os itens reprovados nas revisões de hoje e calcula o percentual sobre o total de reprovações.
- **Responsivo:** grid com `auto-fill`, alvos de toque grandes, barra de ação fixa no rodapé do checklist e tabela que vira lista no celular.
- **Bônus:** botão de Dark Mode no Header, com a escolha salva no navegador.

## Observações

- A foto do hodômetro é só visual: mostra uma prévia e guarda apenas o nome do arquivo.
- As datas do mock são relativas a hoje, então o protótipo sempre mostra revisões "de hoje". Num dia novo, os dados voltam ao mock.
- Em Relatórios, "Restaurar dados de exemplo" apaga os checklists feitos e volta ao mock (útil para apresentar).
