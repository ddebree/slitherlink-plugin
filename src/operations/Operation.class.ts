import {Puzzle} from "../Puzzle.class";

export class Operation {

    public applyToPuzzle(puzzle: Puzzle): Puzzle {
        return puzzle;
    }

}

export class CellValueOperation extends Operation {

    public applyToPuzzleForCell(puzzle: Puzzle, row: number, col: number): Puzzle {
        return puzzle;
    }

    public applyToPuzzle(puzzle: Puzzle): Puzzle {
        for (var row = 0; row < puzzle.getHeight(); row++) {
            for (var col = 0; col < puzzle.getWidth(); col++) {
                if (puzzle.cellMap[row][col] >= 0) {
                    puzzle = this.applyToPuzzleForCell(puzzle, row, col);
                }
            }
        }
        return puzzle;
    }

}