type Props = {
  value: string,
  onClick: (_:number) => void;
  index: number;
  width: number | undefined;
}

export const Square: React.FC<Props> = ({ value, onClick, index, width }) => {
  let className;
  switch(value) {
    case 'O': className = 'is-success'; break;
    case 'X': className = 'is-danger'; break;
    case null:
    default: className = 'is-info'; break;
  }


  return (
  <button
    className={`Square button is-size-2 ${className}`}
    onClick={() => onClick(index)}
    style={{
      width: width ? width / 3 : 0,
    }}
  >
    {value}
  </button>
)
};
