import './App.css';
// import PropTypes from 'prop-types';
import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function SquareCustomized({ squares, handleClick }) {
  const rows = [];
  let squareIndex = 0;

  for (let i = 0; i < 3; i++) {
    const squaresInRow = [];
    for (let j = 0; j < 3; j++) {
      squaresInRow.push(
        <Square
          key={squareIndex}
          value={squares[squareIndex]}
          onSquareClick={() => handleClick(squareIndex)}
        />
      );
      squareIndex++;
    }
    rows.push(
      <div key={i} className="board-row">
        {squaresInRow}
      </div>
    );
  }

  return <div>{rows}</div>;
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = winner + ' a gagné';
  } else {
    status = 'Prochain tour : ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      {/* <SquareCustomized squares={squares} handleClick={handleClick} /> */}
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>

      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>

      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  // const [xIsNext, setXIsNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    // setHistory([...history, nextSquares]);
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      if (move !== currentMove) {
        description = 'Aller au coup #' + move;
      } else {
        description = 'Vous êtes au coup #' + move;
      }
    } else {
      description = 'Revenir au début';
    }

    let displayHistoryDescription;
    if (move !== currentMove) {
      displayHistoryDescription = (
        <button onClick={() => jumpTo(move)}>{description}</button>
      );
    } else {
      displayHistoryDescription = <span>{description}</span>;
    }

    return <li key={move}>{displayHistoryDescription}</li>;
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{/*TODO*/ moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
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

// Square.propTypes = {
//   value: PropTypes.string.isRequired,
//   onSquareClick: PropTypes.func.isRequired,
//   onPlay: PropTypes.func.isRequired,
//   xIsNext: PropTypes.bool.isRequired,
// };
