import { Puzzle } from "../Puzzle.class";

export class AbstractStrategy {

    public applyToPuzzle(puzzle: Puzzle): Puzzle {
        return puzzle;
    }

}

export class AbstractCellWithValueStrategy extends AbstractStrategy {

    public applyToPuzzleForCell(puzzle: Puzzle, row: number, col: number, cellValue: number): Puzzle {
        return puzzle;
    }

    public applyToPuzzle(puzzle: Puzzle): Puzzle {
        for (var row = 0; row < puzzle.getHeight(); row++) {
            for (var col = 0; col < puzzle.getWidth(); col++) {
                const cellValue = puzzle.getCellValue(row, col);
                if (cellValue >= 0) {
                    puzzle = this.applyToPuzzleForCell(puzzle, row, col, cellValue);
                }
            }
        }
        return puzzle;
    }

}