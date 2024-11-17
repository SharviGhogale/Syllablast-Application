'use client'                              // directive to clarify client-side
import React,{useEffect } from 'react'
import { config1, config2, config3 } from '../puzzle'
import { Model} from '../model'
import { BoardGUI} from '../boundary'
import { realHandle } from '../controllers'


export default function Home() {
  const [actualPuzzle, setActualPuzzle] = React.useState(config1); // Initialize with the first config
  const [model, setModel] = React.useState(new Model(actualPuzzle));
  const [redraw, setRedraw] = React.useState(0)

  useEffect(() => {
    setModel(new Model(actualPuzzle)); // Update model whenever actualPuzzle changes
  }, [actualPuzzle]);


  function refresh() {
    setRedraw(redraw+1)
  }


// to carry out swap 
  function handleSwap() {
    const button1 = 1
    realHandle(model,button1)
    refresh()
  }

  function handleUndo() {
    const button2 = 2
    realHandle(model,button2)
    refresh()

  }

  function handleReset() {
    const button3 = 3
    setModel(new Model(actualPuzzle));
    realHandle(model,button3)
    refresh()
  }

// selection of configuration
  function handleSelectConfig(config:number){
    if (config==1){
      console.log("This is configuration 1")
      setActualPuzzle(config1)

    }
    else if (config==2){
      console.log("This is configuration 2")
      setActualPuzzle(config2)
    }
    else{
      console.log("This is configuration 3")
      setActualPuzzle(config3)
    }
  }

  return (
    <main>
    <div className="flex flex-col items-center justify-center min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)] space-y-8">
      
      {/* Configuration and Score Section */}
      <div className="flex flex-col items-center space-y-4">
        <div className="config text-center">
          <label className="syllablast">Syllablast</label><br />
          <label className="selectconfig">Select a Configuration to play</label>
        </div>
        
        {/* Configuration Buttons */}
        <div className="flex flex-wrap justify-center space-x-4">
          <button className="C" id="config1" onClick={() => handleSelectConfig(1)}>Configuration 1</button>
          <button className="C" id="config2" onClick={() => handleSelectConfig(2)}>Configuration 2</button>
          <button className="C" id="config3" onClick={() => handleSelectConfig(3)}>Configuration 3</button>
        </div>
        
        {/* Moves and Score Labels */}
        <div className="flex justify-between w-full max-w-3xl">
          <label className="numOfmoves">{"Moves: " + model.numMoves}</label>
          <label className="score">{"Score: " + model.score}</label>
        </div>
      </div>

      {/* BoardGUI */}
      <BoardGUI topmodel={model} redraw={refresh} />

      {/* Action Buttons Section */}
      <div className="flex space-x-4">
        <button className="resetButton" onClick={() => handleReset()}>Reset</button>
        <button data-testid="Swap" className="swapButton" onClick={() => handleSwap()} disabled={model.completePuzzle()}>Swap</button>
        <button data-testid="Undo" className="undoButton" onClick={() => handleUndo()} disabled={model.completePuzzle()}>Undo</button>
      </div>
    </div>
  </main>
  )
}
