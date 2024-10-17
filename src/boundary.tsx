'use client'                              // directive to clarify client-side
import React, {useState,useEffect} from 'react'
import { Model,Coordinate,Board} from './model'
import {actualPuzzle} from './app/page'
import { realHandle } from './controllers'


// redraw is a function
export function BoardGUI({topmodel, redraw}) { 
  const [selectedSyllables, setSelectedSyllables] = useState<Coordinate[]>([]);


  // low level contoller
    function handleClick(r:number, c:number) {
      console.log("clicked on: ", r, c, redraw)
      const clickCoordinate = new Coordinate(r, c);
      let updatedSyllables = [...selectedSyllables];

      if (updatedSyllables.length === 2) {
          updatedSyllables.shift(); // Remove the first syllable
      }

      // Add the newly selected syllable to the end of the array
      updatedSyllables.push(clickCoordinate);

      // Update state with the new syllables array
      setSelectedSyllables(updatedSyllables);

      // If exactly 2 syllables are selected, perform the swap or desired action
      if (updatedSyllables.length === 2) {
          storage(updatedSyllables[0], updatedSyllables[1]);
      }
   
      redraw()  // call the redraw
    }

    function storage(coord1:Coordinate,coord2: Coordinate){
      let model = topmodel
      model.storingCoordianteData(coord1,coord2)
    }
    

    // handleclick is a function that on onclick of a syllable it adds a x to the front of the syllable
    return (
      <div className="board">
        <div>
          <button className="square" onClick={() => handleClick(0, 0)}>{topmodel.board.syllables[0][0]}</button>
          <button className="square" onClick={() => handleClick(0, 1)}>{topmodel.board.syllables[0][1]}</button>
          <button className="square" onClick={() => handleClick(0, 2)}>{topmodel.board.syllables[0][2]}</button>
          <button className="square" onClick={() => handleClick(0, 3)}>{topmodel.board.syllables[0][3]}</button>
        </div>
        <div>
          <button className="square" onClick={() => handleClick(1, 0)}>{topmodel.board.syllables[1][0]}</button>
          <button className="square" onClick={() => handleClick(1, 1)}>{topmodel.board.syllables[1][1]}</button>
          <button className="square" onClick={() => handleClick(1, 2)}>{topmodel.board.syllables[1][2]}</button>
          <button className="square" onClick={() => handleClick(1, 3)}>{topmodel.board.syllables[1][3]}</button>
        </div>
        <div>
          <button className="square" onClick={() => handleClick(2, 0)}>{topmodel.board.syllables[2][0]}</button>
          <button className="square" onClick={() => handleClick(2, 1)}>{topmodel.board.syllables[2][1]}</button>
          <button className="square" onClick={() => handleClick(2, 2)}>{topmodel.board.syllables[2][2]}</button>
          <button className="square" onClick={() => handleClick(2, 3)}>{topmodel.board.syllables[2][3]}</button>
        </div>
        <div>
          <button className="square" onClick={() => handleClick(3, 0)}>{topmodel.board.syllables[3][0]}</button>
          <button className="square" onClick={() => handleClick(3, 1)}>{topmodel.board.syllables[3][1]}</button>
          <button className="square" onClick={() => handleClick(3, 2)}>{topmodel.board.syllables[3][2]}</button>
          <button className="square" onClick={() => handleClick(3, 3)}>{topmodel.board.syllables[3][3]}</button>
        </div>
      </div>
    )
  }


