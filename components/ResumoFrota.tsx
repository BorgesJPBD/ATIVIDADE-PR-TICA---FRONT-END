import type { ContagemStatus } from '@/lib/frota';

/** Contadores do topo da Garagem + barra com a proporção da frota */
export default function ResumoFrota({ contagem }: { contagem: ContagemStatus }) {
  const { aptos, inaptos, pendentes } = contagem;

  return (
    <section className="resumo-frota" aria-label="Situação da frota">
      <div className="barra-frota" aria-hidden="true">
        <span className="seg--apto" style={{ flexGrow: aptos }} />
        <span className="seg--inapto" style={{ flexGrow: inaptos }} />
        <span className="seg--pendente" style={{ flexGrow: pendentes }} />
      </div>

      <ul className="contadores">
        <li className="contador contador--apto">
          <span className="contador-numero">{aptos}</span>
          <span className="contador-rotulo">Aptos</span>
        </li>
        <li className="contador contador--inapto">
          <span className="contador-numero">{inaptos}</span>
          <span className="contador-rotulo">Inaptos</span>
        </li>
        <li className="contador contador--pendente">
          <span className="contador-numero">{pendentes}</span>
          <span className="contador-rotulo">Pendentes</span>
        </li>
      </ul>
    </section>
  );
}
