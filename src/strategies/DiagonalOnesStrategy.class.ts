import {LINK_STATE_X, Puzzle} from "../Puzzle.class";
import { AbstractCellWithValueStrategy } from "./AbstractStrategy.class";

/**
 * Filling in x-es based on adjacent 1-cells
 */
export class DiagonalOnesStrategy extends AbstractCellWithValueStrategy {

    public applyToPuzzleForCell(puzzle: Puzzle, row: number, col: number, cellValue: number): Puzzle {
        if (cellValue != 1) {
            return puzzle;
        }
        //Diagonal downward case: The cell below and to the right of this is also 1
        if (puzzle.getValidCellValue(row + 1, col + 1) == 1) {
            //Outer Xs
            // . X .   .
            // X*1*
            // .   .   .
            //       1 x
            // .   . x .
            if (puzzle.getHorizontalLinkState(row, col) === LINK_STATE_X
                && puzzle.getVerticalLinkState(row, col) === LINK_STATE_X) {
                puzzle = puzzle.optionalSetHorizontalLinkTo(row + 2, col + 1, LINK_STATE_X);
                puzzle = puzzle.optionalSetVerticalLinkTo(row + 1, col + 2, LINK_STATE_X);
            }
            //Inner Xs
            // .   .   .
            //  *1*X
            // . X . x .
            //     x 1
            // .   .   .
            if (puzzle.getHorizontalLinkState(row + 1, col) === LINK_STATE_X
                && puzzle.getVerticalLinkState(row, col + 1) === LINK_STATE_X) {
                puzzle = puzzle.optionalSetHorizontalLinkTo(row + 1, col + 1, LINK_STATE_X);
                puzzle = puzzle.optionalSetVerticalLinkTo(row + 1, col + 1, LINK_STATE_X);
            }
        }

        //Diagonal upward case: The cell above and to the right of this is also 1
        if (puzzle.getValidCellValue(row - 1, col + 1) == 1) {
            //Outer Xs
            // .   . x .
            //       1 x
            // .   .   .
            // X*1*
            // . X .   .
            if (puzzle.getHorizontalLinkState(row + 1, col) === LINK_STATE_X
                && puzzle.getVerticalLinkState(row, col) === LINK_STATE_X) {
                puzzle = puzzle.optionalSetHorizontalLinkTo(row - 1, col + 1, LINK_STATE_X);
                puzzle = puzzle.optionalSetVerticalLinkTo(row - 1, col + 2, LINK_STATE_X);
            }
            //Inner Xs
            // .   .   .
            //     x 1
            // . X . x .
            //  *1*X
            // .   .   .
            if (puzzle.getHorizontalLinkState(row, col) === LINK_STATE_X
                && puzzle.getVerticalLinkState(row, col + 1) === LINK_STATE_X) {
                puzzle = puzzle.optionalSetHorizontalLinkTo(row, col + 1, LINK_STATE_X);
                puzzle = puzzle.optionalSetVerticalLinkTo(row - 1, col + 1, LINK_STATE_X);
            }
        }
        return puzzle;
    }

}
