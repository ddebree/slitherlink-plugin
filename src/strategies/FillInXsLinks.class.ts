import {LINK_STATE_SET, LINK_STATE_X, Puzzle} from "../Puzzle.class";
import {AbstractDotStrategy, AbstractStrategy} from "./AbstractStrategy.class";

/**
 * This strategy enforces the rule that each dot must have either
 * zero or two links coming to it.
 * If the dot has 2 links then the other slots are set to 'x'.
 * If the dot has at least 1 link and 2 'x' values then the remaining slot is set to a link.
 * If the dot has 3 'x' values then the remaining slot is set to an 'x' value.
 **/
export class FillInXsLinks extends AbstractDotStrategy {

    public applyToPuzzleForDot(puzzle: Puzzle, row: number, col: number): Puzzle {
        const numLinks = puzzle.countAroundDot(row, col, LINK_STATE_SET)
        const numXs = puzzle.countAroundDot(row, col, LINK_STATE_X)

        // --- . ----- .
        //     |       |
        // --- O ----- .
        //     | (r,c) |
        // --- . ----- .
        if (numLinks == 2 && numXs < 2) {
            // The other two slots should be set to 'x'.
            puzzle = puzzle.optionalSetVerticalLinkTo(row, col, LINK_STATE_X);
            puzzle = puzzle.optionalSetVerticalLinkTo(row - 1, col, LINK_STATE_X);
            puzzle = puzzle.optionalSetHorizontalLinkTo(row, col - 1, LINK_STATE_X);
            puzzle = puzzle.optionalSetHorizontalLinkTo(row, col, LINK_STATE_X);
        } else if (numLinks == 1 && numXs == 2) {
            //The remaining slot should be set to a link.
            puzzle = puzzle.optionalSetVerticalLinkTo(row, col, LINK_STATE_SET);
            puzzle = puzzle.optionalSetVerticalLinkTo(row - 1, col, LINK_STATE_SET);
            puzzle = puzzle.optionalSetHorizontalLinkTo(row, col - 1, LINK_STATE_SET);
            puzzle = puzzle.optionalSetHorizontalLinkTo(row, col, LINK_STATE_SET);
        } else if (numXs == 3) {
            //The remaining link should also be an X
            puzzle = puzzle.optionalSetVerticalLinkTo(row, col, LINK_STATE_X);
            puzzle = puzzle.optionalSetVerticalLinkTo(row - 1, col, LINK_STATE_X);
            puzzle = puzzle.optionalSetHorizontalLinkTo(row, col - 1, LINK_STATE_X);
            puzzle = puzzle.optionalSetHorizontalLinkTo(row, col, LINK_STATE_X);
        }
        return puzzle;
    }

}

