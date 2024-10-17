import { BoardGUI} from './boundary';
import { config1, config2, config3 } from './puzzle'
import { } from './controllers'
import Home from './app/page'

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

        let board = new Board();
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

    // Swap syllables and update the score
    swapSyllables() {
        if (this.completePuzzle()) return;  // No more swaps if puzzle is solved
        let s1=this.syllable1
        let s2=this.syllable2
        this.board.swap( s1, s2);
        this.numMoves++;
        this.swapStored.push([s1,s2]);  // Track swap for undo
        this.scorecount();

        if (this.completePuzzle()) {
            setTimeout(() => {
                alert("Congratulations! You won!");
            }, 0);     
        }
        return [this.numMoves,this.score]
    }

    // Undo the last swap
    undoLastSwap() {
        if (this.completePuzzle()) return;  // No more swaps if puzzle is solved
        if (this.swapStored.length > 0) {
            const lastSwap = this.swapStored.pop();
            if (lastSwap) {
                this.board.swap(lastSwap[0], lastSwap[1]);
                this.numMoves--;
                this.scorecount();
            }
        }
        return [this.numMoves,this.score]

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

























































// export class Board {
//     syllables: string[][];
//     initial: string[][];  // To hold the initial configuration for reset

//     constructor(puzzle: any) {
//         this.syllables = [];
//         this.initial = puzzle.initial;
//         for (let r: number = 0; r < 4; r++) {
//             this.syllables[r] = [];
//             for (let c: number = 0; c < 4; c++) {
//                 this.syllables[r][c] = puzzle.initial[r][c];
//             }
//         }
//     }

//     // Swap two syllables on the board
//     swap(coord1: Coordinate, coord2: Coordinate) {
//         const temp = this.syllables[coord1.row][coord1.column];
//         this.syllables[coord1.row][coord1.column] = this.syllables[coord2.row][coord2.column];
//         this.syllables[coord2.row][coord2.column] = temp;
//     }

//     // Reset the board to the initial configuration
//     reset() {
//         for (let r = 0; r < 4; r++) {
//             for (let c = 0; c < 4; c++) {
//                 this.syllables[r][c] = this.initial[r][c];
//             }
//         }
//     }
// }

// export class Model {
//     words: string[][];
//     board: Board;
//     score: number;
//     numMoves: number;
//     swapHistory: { coord1: Coordinate; coord2: Coordinate }[];  // Track swaps

//     constructor(puzzle: any) {
//         this.words = [ 
//             ["af", "fil", "i", "ate"],
//             ["im", "mac", "u", "late"],
//             ["in", "vis", "i", "ble"],
//             ["un", "der", "wa", "ter"]
//         ];

//         this.board = new Board(puzzle);
//         this.score = 0;
//         this.numMoves = 0;
//         this.swapHistory = [];
//     }

//     // Calculate the current score
//     calculateScore() {
//         this.score = 0;
//         for (let r = 0; r < 4; r++) {
//             let consecutive = 0;
//             for (let c = 0; c < 4; c++) {
//                 if (this.board.syllables[r][c] === this.words[r][c]) {
//                     consecutive++;
//                 } else {
//                     break;
//                 }
//             }
//             this.score += consecutive;
//         }
//     }

//     // Swap syllables and update the score
//     swapSyllables(coord1: Coordinate, coord2: Coordinate) {
//         if (this.isSolved()) return;  // No more swaps if puzzle is solved

//         this.board.swap(coord1, coord2);
//         this.numMoves++;
//         this.swapHistory.push({ coord1, coord2 });  // Track swap for undo

//         this.calculateScore();

//         if (this.isSolved()) {
//             console.log("Congratulations! You solved the puzzle.");
//         }
//     }

//     // Undo the last swap
//     undoLastSwap() {
//         if (this.swapHistory.length > 0) {
//             const lastSwap = this.swapHistory.pop();
//             if (lastSwap) {
//                 this.board.swap(lastSwap.coord1, lastSwap.coord2);
//                 this.numMoves--;
//                 this.calculateScore();
//             }
//         }
//     }

//     // Reset the puzzle to its initial state
//     resetPuzzle() {
//         this.board.reset();
//         this.numMoves = 0;
//         this.score = 0;
//         this.swapHistory = [];
//     }

//     // Check if the puzzle is solved
//     isSolved(): boolean {
//         return this.score === 16;  // Maximum score is 16 if all syllables are in correct order
//     }
// }
