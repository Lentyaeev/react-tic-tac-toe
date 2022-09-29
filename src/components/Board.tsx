import React, {useState, useEffect, useCallback } from 'react'
import { Square } from './Square';
import { useSpring, animated, config } from 'react-spring';

export const Board:React.FC = () => {
  const [squares, setSquares] = useState<string[]>([]);
  const [winner, setWinner] = useState<string | null>(''); 
  const [xIsNext, setXisNext] = useState<boolean>();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const props = useSpring({ 
    to: { opacity: 1 },
    from: { opacity: 0 },
    reset: true,
    config: config.molasses,
  });

  useEffect(() => {
    newGame();
    setIsVisible(false);
  }, []);

  useEffect(() => {
    if (squares.every(sq => sq !== null || '') && squares.length !== 0) {
      if (!calculateWinner()) {
        setWinner('no one');
      } else {
        setWinner(calculateWinner());
      }
    } else {
      setWinner(calculateWinner());
    }
  }, [squares])

  useEffect(() => {
    if(winner) {
      setIsVisible(true);
    }
  }, [winner]);

  const player = xIsNext ? 'X' : 'O';


  const newGame = () => {
    setXisNext(true);
    setWinner(null);
    const set = new Array(9).fill(null);
    setSquares(set);
  }

  const makeMove = useCallback((index: number) => {
    if (!squares[index]) {
      setSquares((prev) => (
        prev.map((square, i) => i === index ? player : square)
      ));
      setXisNext((prev) => !prev);
    }
  }, [player, squares]);

  const calculateWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  const onClick = winner !== null ? () => {} : makeMove;

  return (
    <>
      {isVisible &&
        <animated.div
          style={props}
          className="modal is-active"
        >
          <div className="modal-background"></div>
          <div className='modal-content box'>
            {(winner === 'X' || winner === 'O') 
            ? <h2>The winner is {winner}!</h2> 
            : <h2>It's a tie game!</h2>}
          </div>
          <button 
            className="modal-close is-large"
            aria-label="close"
            onClick={() => setIsVisible(false)}
          >
          </button>
        </animated.div>
      }
      <div 
        className='Board'
      >
        {squares.map((square, index) => {
          return(
            <Square 
              key={index}
              value={square}
              onClick={onClick}
              index={index}
            />
          )
        })}
      </div>
    </>
  )
}
