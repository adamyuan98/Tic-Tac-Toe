import { useState } from 'react'
import './App.css'
import Game from './Components/Game/Game'


function App() {
  const [gridSize, setGridSize] = useState("3 x 3");
  const convertGridSize = (sizeString: String): [number, number] => {
    if (sizeString == "4 x 4") return [4, 4]
    if (sizeString == "5 x 5") return [5, 5]
    return [3, 3]
  } 

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <select value={gridSize} onChange={e => setGridSize(e.target.value)}>
        <option value={"3 x 3"}>3 x 3</option>
        <option value={"4 x 4"}>4 x 4</option>
        <option value={"5 x 5"}>5 x 5</option>
      </select>
      <Game gridSize={convertGridSize(gridSize)}/>
    </div>
  )
}

export default App
