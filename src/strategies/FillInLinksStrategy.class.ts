import { LINK_STATE_SET, LINK_STATE_X, Puzzle } from "../Puzzle.class";
import { AbstractCellWithValueStrategy } from "./AbstractStrategy.class";

/**
 * This handles the case where a cell has a number in it, call it cellnum,
 * and the cell is surrounded by 4 - cellnum 'x' values.
 * In this case, the remaining slots must be links.
 */
export class FillInLinksStrategy extends AbstractCellWithValueStrategy {

    public applyToPuzzleForCell(puzzle: Puzzle, row: number, col: number, cellValue: number): Puzzle {
        const numLinks = puzzle.countAroundCell(row, col, LINK_STATE_SET);
        const numXs = puzzle.countAroundCell(row, col, LINK_STATE_X)

        if (numLinks < cellValue && ((4 - numXs) == cellValue)) {
            puzzle = puzzle.optionalSetVerticalLinkTo(row, col, LINK_STATE_SET);
            puzzle = puzzle.optionalSetVerticalLinkTo(row, col + 1, LINK_STATE_SET);
            puzzle = puzzle.optionalSetHorizontalLinkTo(row, col, LINK_STATE_SET);
            puzzle = puzzle.optionalSetHorizontalLinkTo(row + 1, col, LINK_STATE_SET);
        }
        return puzzle;
    }

}