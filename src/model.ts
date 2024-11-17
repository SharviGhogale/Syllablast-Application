import { } from './controllers'

export class Coordinate {
    readonly row : number;
    readonly column : number;

    constructor(row:number, column:number) {
      this.row = row;
      this.column = column;
    }

}

export class Board {
    syllables : string[][]

    constructor() {
        this.syllables = []
        for (let r:number = 0; r < 4; r++) {
            this.syllables[r] = []
            for (let c:number = 0; c < 4; c++) {
                this.syllables[r][c] = ''
            }
        }
    }

// swapping of syllables is carried out 
    public swap(coord1:Coordinate,coord2:Coordinate){
        const temp=this.syllables[coord1.row][coord1.column]
        this.syllables[coord1.row][coord1.column]=this.syllables[coord2.row][coord2.column]
        this.syllables[coord2.row][coord2.column]=temp
        return [coord1,coord2]
    }
}


export class Model {
    // name: string;
    words : string[][];
    initial: string[][];
    board : Board;
    score : number;
    numMoves : number;
    syllable1:  Coordinate | null = null;
    syllable2:  Coordinate | null = null;

    swapStored: { coord1: Coordinate; coord2: Coordinate }[];  // Track swaps

    constructor(puzzle: {name: string; words:string[][]; initial:string[][]}) {
        this.words=puzzle.words
        this.initial=puzzle.initial

        const board = new Board();
        for (let r:number = 0; r < 4; r++) {
            for (let c:number = 0; c < 4; c++) {
                board.syllables[r][c] = this.initial[r][c]
            }
        }
        this.board = board;
        this.numMoves =0;
        this.score=0;
        this.swapStored=[];
        this.scorecount()
    }


    scorecount(){
        this.score = 0;

        for (let row = 0; row < 4; row++) {
            let maxConsecutiveCount = 0;

            for (let i = 0; i < 4; i++) {
                let consecutiveCount = 0;

                for (let col = 0; col < this.board.syllables[row].length; col++) {
                    if (this.board.syllables[row][col] === this.words[i][col]) {
                        consecutiveCount++;
                    } else {
                        break; // breaks to stop further if it does not match
                    }
                }

                // Updating the max consecutive for the current row
                maxConsecutiveCount = Math.max(maxConsecutiveCount, consecutiveCount);
            }

            // Add the max consecutive to the score
            this.score += maxConsecutiveCount;
        }

        return this.score;
    }

    // Storing coordinate syllables selected by player
    storingCoordianteData(c1: Coordinate, c2: Coordinate){
        this.syllable1=c1
        this.syllable2=c2

        return [this.syllable1,this.syllable2]       
    }

    swapSyllables() {
        if (this.completePuzzle()) return;  // No more swaps if puzzle is solved
    
        const s1 = this.syllable1;
        const s2 = this.syllable2;
    
        if (s1 && s2) {
            this.board.swap(s1, s2);
            this.numMoves++;
            this.swapStored.push({ coord1: s1, coord2: s2 });
            this.scorecount();
    
            if (this.completePuzzle()) {
                setTimeout(() => {
                    alert("Congratulations! You won!");
                }, 0);
            }
        }
        return [this.numMoves, this.score];
    }
    
    undoLastSwap() {
        if (this.completePuzzle()) return;  // No more swaps if puzzle is solved
        if (this.swapStored.length > 0) {
            const lastSwap = this.swapStored.pop();
            if (lastSwap) {
                this.board.swap(lastSwap.coord1, lastSwap.coord2);
                this.numMoves--;
                this.scorecount();
            }
        }
        return [this.numMoves, this.score];
    }
 
    // Reset the puzzle to its initial state
    resetPuzzle() {
        this.numMoves = 0;
        this.score = 0;
        this.swapStored = [];
        return [this.numMoves,this.score,this.swapStored]
    }
    
    // Checks if puzzle has been completed
    completePuzzle():boolean{
        return this.score==16;
    }


}
