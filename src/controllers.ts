import { Model } from './model'

export function realHandle(model:Model,button:number) {
    // the button that is selected will call respective functions
    if (button==1){
      realHandleSwap()
    }
    else if(button==2){
      realHandleUndo()
    }
    else {
      realHandleReset()
    }
    
    // Calls the swapping function in model
    // handles Swap 
    function realHandleSwap() {
      model.swapSyllables()
    }
  
    // handles undo 
    function realHandleUndo() {
      model.undoLastSwap()
    }

    // handles reset
    function realHandleReset() {
      model.resetPuzzle()
    }
  }