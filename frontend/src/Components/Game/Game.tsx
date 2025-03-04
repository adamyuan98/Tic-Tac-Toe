import { useState, useEffect } from "react";
import "./Game.css"

interface GameProps {
  gridSize: [number, number]
}

const Game = ({ gridSize }: GameProps) => {
  const nCols = gridSize[0]
  const nRows = gridSize[1]
  const goal = Math.min(gridSize[0], gridSize[1]) 
  const initSquares = Array(nRows * nCols).fill(null)
  const initNumMoves = 0
  const initTurn = "O"  // Mounting flips initial turn
  const initTarget = 0
  const initStatusText = initTurn + "'s turn"
  const initWinner = null
  
  const [squares, setSquares] = useState(initSquares);
  const [numMoves, setNumMoves] = useState(initNumMoves);
  const [turn, setTurn] = useState(initTurn);
  const [target, setTarget] = useState(initTarget);
  const [statusText, setStatusText] = useState(initStatusText);
  const [winner, setWinner]: any = useState(initWinner);
  
  const handleReset = () => {
    setSquares(initSquares)
    setStatusText(initStatusText)
    setTurn(initTurn)
    setWinner(initWinner)
  }
  const handleMove = (id: number) => {
    if (squares[id] || winner) 
      return
    setTarget(id)
    setNumMoves(numMoves => numMoves + 1)
    const newSquares = [...squares]
    newSquares[id] = turn
    setSquares(newSquares)
  }
  
  useEffect(() => {
    handleReset()
  }, [nCols, nRows]);

  useEffect(() => {
    setTurn(turn == "X" ? "O" : "X")
    setWinner(getWinner())
  }, [squares, target]);

  useEffect(() => {
    let status = statusText
    if (winner) {
      status = winner + " wins"
    } else if (numMoves === nCols * nRows) {
      status = "Draw"
    } else {
      status = turn + "'s turn"
    }
    setStatusText(status)
  }, [turn, winner, numMoves]);
  
  const getWinner = () => {   
    const countConnected = (row: number, col: number, dir: [number, number]) => {
      let connected = 0
      let curr: String | null = squares[row * nCols + col]
      while ((row >= 0 && col >= 0 && row < nRows && col < nCols) && curr === turn) {
        connected++;
        row = row + dir[0]
        col = col + dir[1]
        curr = squares[row * nCols + col]
      }
      return connected
    }
    const search = (dir: [number, number]) => {
      const row = Math.floor(target / nCols)  
      const col = target % nCols
      const count1 = countConnected(row, col, dir)
      const count2 = countConnected(row-dir[0], col-dir[1], [-dir[0], -dir[1]])
      return count1 + count2 >= goal
    }
    return search([1, 0]) || search([0, 1]) || search([1, 1]) || search([-1, 1]) 
      ? turn 
      : null
  }

  const boardStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${nCols}, 100px)`,
    gridTemplateRows: `repeat(${nRows}, 100px)`,
  };

  return (
    <div className="game">
      <h2>{statusText}</h2>
      <div style={boardStyle}>      
        {squares.map((value, index) => (
          <button key={index} onClick={()=>handleMove(index)} className="square">
          {value}
          </button>
        ))}
      </div>
      <button className="reset" onClick={handleReset}>Reset</button>
    </div>
  )
}

export default Game