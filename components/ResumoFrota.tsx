import type { ContagemStatus } from '@/lib/frota';

export default function ResumoFrota({ contagem }: { contagem: ContagemStatus }) {
  const { aptos, inaptos, pendentes, total } = contagem;

  const contadores = [
    { classe: 'contador--apto', numero: aptos, rotulo: 'Aptos' },
    { classe: 'contador--inapto', numero: inaptos, rotulo: 'Inaptos' },
    { classe: 'contador--pendente', numero: pendentes, rotulo: 'Pendentes' },
  ];

  return (
    <ul className="contadores" aria-label="Situação da frota">
      {contadores.map((contador) => (
        <li key={contador.rotulo} className={`contador ${contador.classe}`}>
          <span className="contador-rotulo">{contador.rotulo}</span>
          <span className="contador-numero">{contador.numero}</span>
          <span className="contador-total">de {total}</span>
        </li>
      ))}
    </ul>
  );
}
