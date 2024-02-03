import {LINK_STATE_SET, LINK_STATE_X, Puzzle} from "../Puzzle.class";
import {AbstractCellWithValueStrategy, AbstractStrategy} from "./AbstractStrategy.class";

/**
 * This function handles the situation where two adjacent cells (either
 * horizontal, vertical, or diagonal from each other) have '3' values.
 * In these cases we can fill in some of the slots with links and/or 'x'
 * values, although we can't fully assign links.
 */
export class AdjacentThreesStrategy extends AbstractCellWithValueStrategy {

    public applyToPuzzleForCell(puzzle: Puzzle, row: number, col: number, cellValue: number): Puzzle {
        if (cellValue != 3) {
            return puzzle;
        }

        //Horizontal case: The cell to the right of the current cell is also a three
        if (puzzle.getValidCellValue(row, col + 1) == 3) {

            // .   .   .
            //     X
            // .   .   .
            // |*3*| 3 |
            // .   .   .
            //     X
            // .   .   .

            puzzle = puzzle.optionalSetVerticalLinkTo(row, col, LINK_STATE_SET);
            puzzle = puzzle.optionalSetVerticalLinkTo(row, col + 1, LINK_STATE_SET);
            puzzle = puzzle.optionalSetVerticalLinkTo(row, col + 2, LINK_STATE_SET);

            puzzle = puzzle.optionalSetVerticalLinkTo(row - 1, col + 1, LINK_STATE_X);
            puzzle = puzzle.optionalSetVerticalLinkTo(row + 1, col + 1, LINK_STATE_X);
        }

        //Vertical case: The cell below the current cell is also a three
        if (puzzle.getValidCellValue(row + 1, col) == 3) {

            // .   .---.   .
            // .    *3*
            // . X .---. X .
            // .     3
            // .   .---.   .

            puzzle = puzzle.optionalSetHorizontalLinkTo(row, col, LINK_STATE_SET);
            puzzle = puzzle.optionalSetHorizontalLinkTo(row + 1, col, LINK_STATE_SET);
            puzzle = puzzle.optionalSetHorizontalLinkTo(row + 2, col, LINK_STATE_SET);

            puzzle = puzzle.optionalSetHorizontalLinkTo(row + 1, col - 1, LINK_STATE_X);
            puzzle = puzzle.optionalSetHorizontalLinkTo(row + 1, col + 1, LINK_STATE_X);
        }

        //Diagonal downward case: The cell below and to the right of this is also 3
        if (puzzle.getValidCellValue(row + 1, col + 1) == 3) {

            // .---.   .
            // |*3*
            // .   .   .
            //       3 |
            // .   .---.

            puzzle = puzzle.optionalSetHorizontalLinkTo(row, col, LINK_STATE_SET);
            puzzle = puzzle.optionalSetVerticalLinkTo(row, col, LINK_STATE_SET);

            puzzle = puzzle.optionalSetHorizontalLinkTo(row + 2, col + 1, LINK_STATE_SET);
            puzzle = puzzle.optionalSetVerticalLinkTo(row + 1, col + 2, LINK_STATE_SET);
        }

        //Diagonal upward case: The cell above and to the right of this is also 3
        if (puzzle.getValidCellValue(row - 1, col + 1) == 3) {

            // .   .---.
            //       3 |
            // .   .   .
            // |*3*
            // .--- .   .

            puzzle = puzzle.optionalSetHorizontalLinkTo(row + 1, col, LINK_STATE_SET);
            puzzle = puzzle.optionalSetVerticalLinkTo(row, col, LINK_STATE_SET);

            puzzle = puzzle.optionalSetHorizontalLinkTo(row - 1, col + 1, LINK_STATE_SET);
            puzzle = puzzle.optionalSetVerticalLinkTo(row - 1, col + 2, LINK_STATE_SET);
        }

        return puzzle;
    }

}
