import { expect, test,vi} from 'vitest'
import { Coordinate, Board, Model } from './model.ts'
import { config1 } from './puzzle.ts'
import { Model } from './model.ts'


// 1. Coordinate 
test('Coordinate', () => {
  let c1 = new Coordinate(3, 4)
  expect(c1.row).toBe(3)
  expect(c1.column).toBe(4)
})


//2. Swap
test('swap Syllables', () => {
  let m = new Model(config1)
  m.score=0
  m.numMoves=0
  m.swapStored=[]
  m.syllable1=new Coordinate(1,1)
  m.syllable2=new Coordinate(1,0)
  const [numMoves,score] = m.swapSyllables();
  expect(m.completePuzzle()).toBe(false)
  expect(m.swapStored.length).toBe(1)
  expect(numMoves).toBe(1)
  expect(score).toBe(1)
  expect(m.completePuzzle()).toBe(false)
})


// 3. Congrats message 
test('Congrats Message', () => {
  const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
  let m = new Model(config1)
  m.swapStored=[]
  m.syllable1=new Coordinate(1,1)
  m.syllable2=new Coordinate(1,0)
  m.score=0
  m.numMoves=0
  const[newMoves,newscore] = m.swapSyllables()
  expect(m.completePuzzle()).toBe(false)
  expect(newMoves).toBe(1)
  expect(newscore).toBe(1)
  expect(m.completePuzzle()).toBe(false)
  expect(alertMock).not.toHaveBeenCalled(); // Verify alert is not called
})

//3. Swap
test('Swap', () => {
  let board=new Board
  let c1=new Coordinate(1,2)
  let c2=new Coordinate(2,0)
  const result = board.swap(c1, c2);
  expect(result).toEqual([c1, c2]);
})

//4. storing coordinate
test('Syllables Store', () => {
  let m = new Model(config1)
  let c1=new Coordinate(1,2)
  let c2=new Coordinate(2,0)
  const result = m.storingCoordianteData(c1, c2);
  expect(result).toEqual([c1, c2]);
})

// 4. Score Count
test('scorecount',() =>{
  let m = new Model(config1)
  let board=new Board
  let c1=new Coordinate(1,2)
  let c2=new Coordinate(2,0)
  const result = board.swap(c1, c2);
  expect(result).toEqual([c1, c2]);
  m.score=0
  expect(m.scorecount()).toBe(0)
})

// 5. Model
test('Model', () => {
  let m = new Model(config1)
  expect(m.numMoves).toBe(0)
  expect(m.score).toBe(0)
  expect(m.completePuzzle()).toBe(false)
  m.score=16
  expect(m.completePuzzle()).toBe(true)
})
// 6. reset 

test('resetPuzzle should reset the puzzle state', () => {
  const m = new Model(config1);
  let c1=new Coordinate(1,2)
  let c2=new Coordinate(2,0)
  m.numMoves = 5;
  m.score = 10;
  m.swapStored = [c1, c2];
  const [numMoves, score, swapStored] = m.resetPuzzle();
  expect(numMoves).toBe(0);               
  expect(score).toBe(0);                  
  expect(swapStored.length).toBe(0);      
  expect(m.numMoves).toBe(0);         
  expect(m.score).toBe(0);            
  expect(m.swapStored.length).toBe(0); 
});

// 7. Undo Swap

test('Undo', () => {
  let m = new Model(config1)
  let c1=new Coordinate(1,2)
  let c2=new Coordinate(0,2)
  m.score=1
  m.numMoves=1
  m.swapStored.push([c1,c2])
  const [numMoves,score] = m.undoLastSwap();
  expect(numMoves).toBe(0);               
  expect(score).toBe(0);   
  expect(m.completePuzzle()).toBe(false)
  expect(m.numMoves).toBe(0)
  expect(m.score).toBe(0)
  expect(m.swapStored.length).toBe(0)
})

//8. Board
test('Board', () => {
  let m = new Model(config1)
  expect(m.numMoves).toBe(0)
  expect(m.scorecount()).toBe(0)
  expect(m.swapStored).toStrictEqual([])
})