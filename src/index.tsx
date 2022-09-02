import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { SquareProps, SquareType, BoardProps } from './types';

const Square: React.FC<SquareProps> = props => {
  return (
    <button className="square" onClick={() => { props.onClick() }}>
      {props.value}
    </button>
  )
};

const Board: React.FC<BoardProps> = props => {
  const renderSquare = (i: number) => {
    return (
      <Square value={props.squares[i]} onClick={() => { props.onClick(i); }} />

    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

const Game: React.FC = () => {
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [history, setHistory] = useState<{ squares: SquareType[] }[]>([
    {
      squares: Array(9).fill(null)
    }
  ]);

  const currentHistory = history[currentStep];
  const winner = calculateWinner(currentHistory.squares);

  const moves = history.map((_step, move) => {
    const desc = move ? 'Go to move #' + move : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => { jumpTo(move) }}>{desc}</button>
      </li>
    );
  });

  const handleClick = (i: number) => {   
    const newHistory = history.slice(0, currentStep + 1);    
    const currentHistory = newHistory[newHistory.length - 1];
    const squares = currentHistory.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(newHistory.concat([{ squares: squares }]));
    setCurrentStep(newHistory.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step: number): void => {
    setCurrentStep(step);
    setXIsNext((step % 2) === 0);
  };
    

  
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={currentHistory.squares} onClick={(i) => handleClick(i)}/>
      </div>
      <div className="game-info">
        <div>{ status }</div>
        <ol>{ moves }</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares: SquareType[]) {
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
  for (const element of lines) {
    const [a, b, c] = element;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<Game />);

