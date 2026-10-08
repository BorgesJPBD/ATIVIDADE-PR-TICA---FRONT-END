interface PlacaProps {
  placa: string;
  tamanho?: 'pequena' | 'normal' | 'grande';
}

export default function Placa({ placa, tamanho = 'normal' }: PlacaProps) {
  const classe = tamanho === 'normal' ? 'placa' : `placa placa--${tamanho}`;

  return (
    <span className={classe} aria-label={`Placa ${placa}`}>
      <span className="placa-pais" aria-hidden="true">
        BR
      </span>
      <span className="placa-letras" aria-hidden="true">
        {placa.slice(0, 3)}
        <span className="placa-separador" />
        {placa.slice(3)}
      </span>
    </span>
  );
}
