import { useState, useEffect } from "react";
import "./Game.css"

const Game = () => {
  const nCols = 3
  const nRows = 3
  const goal = 3
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
    setTurn(turn == "X" ? "O" : "X")
    setWinner(getWinner())
  }, [squares, target])

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

  return (
    <div className="Game">
      <h2>{statusText}</h2>
      <div className="board">      
        {squares.map((value, index) => (
          <button key={index} onClick={()=>handleMove(index)} className="square">
          {value}
          </button>
        ))}
      </div>
      <button className="Reset" onClick={handleReset}>Reset</button>
    </div>
  )
}

export default Game