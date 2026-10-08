interface PlacaProps {
  placa: string;
  tamanho?: 'pequena' | 'normal' | 'grande';
}

/** Placa no padrão Mercosul */
export default function Placa({ placa, tamanho = 'normal' }: PlacaProps) {
  const classe = tamanho === 'normal' ? 'placa' : `placa placa--${tamanho}`;

  return (
    <span className={classe} aria-label={`Placa ${placa}`}>
      <span className="placa-faixa" aria-hidden="true">
        <span className="placa-bandeira" />
        BRASIL
      </span>
      <span className="placa-letras" aria-hidden="true">
        {placa}
      </span>
    </span>
  );
}
