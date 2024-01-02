import { LINK_STATE_SET, LINK_STATE_X, Puzzle } from "../Puzzle.class";
import { AbstractCellWithValueStrategy } from "./AbstractStrategy.class";

/**
 * This helper function fills in 'x' values around cells that are currently
 * surrounded by the number of links specified by the cell's number.  For
 * example, if a cell has the number '1' in it, and currently has one link
 */
export class FillInXsStrategy extends AbstractCellWithValueStrategy {

    public applyToPuzzleForCell(puzzle: Puzzle, row: number, col: number): Puzzle {
        const cellValue = puzzle.cellMap[row][col];
        const numLinks = puzzle.countAroundCell(row, col, LINK_STATE_SET);
        const numXs = puzzle.countAroundCell(row, col, LINK_STATE_X)

        if (numLinks == cellValue && ((numLinks + numXs) < 4)) {
            puzzle = puzzle.optionalSetVerticalLinkTo(row, col, LINK_STATE_X);
            puzzle = puzzle.optionalSetVerticalLinkTo(row, col + 1, LINK_STATE_X);
            puzzle = puzzle.optionalSetHorizontalLinkTo(row, col, LINK_STATE_X);
            puzzle = puzzle.optionalSetHorizontalLinkTo(row + 1, col, LINK_STATE_X);
        }

        return puzzle;
    }

}
