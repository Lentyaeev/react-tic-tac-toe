type Props = {
  value: string,
  onClick: (_:number) => void;
  index: number;
}

export const Square: React.FC<Props> = ({ value, onClick, index }) => {
  let className;
  switch(value) {
    case 'O': className = 'is-success'; break;
    case 'X': className = 'is-danger'; break;
    case null:
    default: className = 'is-info'; break;
  }


  return (
  <button
    className={`Square button ${className}`}
    onClick={() => onClick(index)}
    data-text={value}
  >
  </button>
)
};
