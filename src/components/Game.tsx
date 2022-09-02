import React, { useState } from 'react';
import Board from './Board';
import calculateWinner from './../utils/calculateWinner';
import getStatus from './../utils/getStatus';
import { SquareType } from '../types';

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
  
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={currentHistory.squares} onClick={(i) => handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{ getStatus(winner, xIsNext) }</div>
          <ol>{ moves }</ol>
        </div>
      </div>
    );
  }

export default Game;