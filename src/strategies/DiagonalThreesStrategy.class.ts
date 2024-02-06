import {LINK_STATE_SET, LINK_STATE_X, Puzzle} from "../Puzzle.class";
import {AbstractCellWithValueStrategy, AbstractStrategy} from "./AbstractStrategy.class";

/**
 * This function handles the situation where two adjacent cells (either
 * horizontal, vertical, or diagonal from each other) have '3' values.
 * In these cases we can fill in some of the slots with links and/or 'x'
 * values, although we can't fully assign links.
 */
export class DiagonalThreesStrategy extends AbstractCellWithValueStrategy {

    public applyToPuzzleForCell(puzzle: Puzzle, row: number, col: number, cellValue: number): Puzzle {
        if (cellValue != 3) {
            return puzzle;
        }
        puzzle = this.checkNextCellDownward(puzzle, row, col, row + 1, col + 1);
        puzzle = this.checkNextCellUpward(puzzle, row, col, row - 1, col + 1);
        return puzzle;
    }

    // .---.   .
    // |*3*
    // .   .   .
    //       3 |
    // .   .---.
    private checkNextCellDownward(puzzle: Puzzle, origRow: number, origCol: number, nextRow: number, nextCol: number): Puzzle {
        if (puzzle.getValidCellValue(nextRow, nextCol) == 2) {
            return this.checkNextCellDownward(puzzle, origRow, origCol, nextRow + 1, nextCol + 1);
        } else if (puzzle.getValidCellValue(nextRow, nextCol) == 3) {
            puzzle = puzzle.optionalSetHorizontalLinkTo(origRow, origCol, LINK_STATE_SET);
            puzzle = puzzle.optionalSetVerticalLinkTo(origRow, origCol, LINK_STATE_SET);

            puzzle = puzzle.optionalSetHorizontalLinkTo(nextRow + 1, nextCol, LINK_STATE_SET);
            puzzle = puzzle.optionalSetVerticalLinkTo(nextRow, nextCol + 1, LINK_STATE_SET);
        }
        return puzzle;
    }

    // .   .---.
    //       3 |
    // .   .   .
    // |*3*
    // .--- .   .
    private checkNextCellUpward(puzzle: Puzzle, origRow: number, origCol: number, nextRow: number, nextCol: number): Puzzle {
        if (puzzle.getValidCellValue(nextRow, nextCol) == 2) {
            return this.checkNextCellUpward(puzzle, origRow, origCol, nextRow - 1, nextCol + 1);
        } else if (puzzle.getValidCellValue(nextRow, nextCol) == 3) {
            puzzle = puzzle.optionalSetHorizontalLinkTo(origRow + 1, origCol, LINK_STATE_SET);
            puzzle = puzzle.optionalSetVerticalLinkTo(origRow, origCol, LINK_STATE_SET);

            puzzle = puzzle.optionalSetHorizontalLinkTo(nextRow, nextCol, LINK_STATE_SET);
            puzzle = puzzle.optionalSetVerticalLinkTo(nextRow, nextCol + 1, LINK_STATE_SET);
        }
        return puzzle;
    }

}
