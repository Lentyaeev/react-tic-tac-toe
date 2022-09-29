import { useState } from 'react';
import { Board } from './components/Board';
import Restart from './icons8-restart-100.png';
import 'bulma/css/bulma.min.css';
import './App.scss';
import { useSpring, animated, config} from 'react-spring'

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const props = useSpring({ 
    to: { opacity: 1 },
    from: { opacity: 0 },
    reset: true,
    config: config.molasses,
  })

  return (
    <div className="App columns">
      {(!isStarted) && (
        <div className='button-container'>
          <button 
            className="button is-danger is-large"
            onClick={() => {
              setIsStarted((prev) => !prev);
              setFinished(false);
            }}
          >
            Start new game!
          </button>
        </div>
      )}
      {isStarted && 
        <>
          <animated.button style={props}
            className="column is-one-third button-res"
            onClick={() => {
              console.log(finished);
              setIsStarted((prev) => !prev);
              setFinished(false);
            }}
          >
            <img className="restart" src={Restart} alt='restart' />
          </animated.button>
          <animated.div style={props}>
            <Board setFinished={setFinished} />
          </animated.div>
        </>
      }
        
    </div>
  );
}

export default App;
