import React, { useState, useEffect } from 'react'
import Board from './Board'

const Game = () => {
  const [history1, setHistory1] = useState([{squares: Array(9).fill(null)}])
  const [stepNumber, setStepNumber] = useState(0)
  const [xIsNext, setXIsNext] = useState(true)
  const [status, setStatus] = useState()
  const [moves, setMoves] = useState()

  useEffect(() => {
    console.log(history1)
    const winner = calculateWinner(history1[stepNumber].squares)
    setMoves(history1.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{desc}</button>
        </li>
      );
    }))  

    if(winner){
        setStatus('Winner is ' + winner)
    }else{
        setStatus('Next Player is ' + (xIsNext ? 'X' : 'O'))
    }
  }, [history1])

  const handleClick = i => {
    const history = history1.slice(0, stepNumber +1)
    const current = history[history.length-1]
    const squares = current.squares.slice();

    if(calculateWinner(squares) || squares[i]){
      return
    }
    squares[i]= xIsNext ? 'X' : 'O'
    setHistory1(history.concat([{squares: squares}]))
    setStepNumber(history1.length)
    setXIsNext(!xIsNext)
  }

  const jumpTo = step => {
    setStepNumber(step)
    setXIsNext((step % 2) === 0)
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board 
        squares={history1[stepNumber].squares}
        onClick={(i) => handleClick(i)}/>
      </div>
      <div className="game-info">
        <div>{ status }</div>
        <ol>{ moves }</ol>
      </div>
    </div>
  );
}
    

const calculateWinner = squares => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

  export default Game
  