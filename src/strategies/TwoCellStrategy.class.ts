import {LINK_STATE_SET, LINK_STATE_UNSET, LINK_STATE_X, LinkLocation, Puzzle} from "../Puzzle.class";
import { AbstractCellWithValueStrategy } from "./AbstractStrategy.class";

/**
 * This strategy handles the case of a cell with a 2 in it:
 *  - where a link coming into one of the corners and xs blocks the direction the path could take
 */
export class TwoCellStrategy extends AbstractCellWithValueStrategy {

    public applyToPuzzleForCell(puzzle: Puzzle, row: number, col: number, cellValue: number): Puzzle {
        if (cellValue != 2) {
            return puzzle;
        }
        if (puzzle.countAroundCell(row, col, LINK_STATE_SET) === 2) {
            return puzzle;
        }
        // Key to the links around this 2 cell:
        //      l5  l6
        //  l1  . b . l3
        //      a 2 c
        //  l2  . d . l4
        //      l7  l8

        //Horizontal links:
        const l1: LinkLocation = { row: row, col: col - 1, IsVertical: false };
        const l2: LinkLocation = { row: row + 1, col: col - 1, IsVertical: false };
        const l3: LinkLocation = { row: row, col: col + 1, IsVertical: false };
        const l4: LinkLocation = { row: row + 1, col: col + 1, IsVertical: false }
        //Vertical links:
        const l5: LinkLocation = { row: row - 1, col: col, IsVertical: true };
        const l6: LinkLocation = { row: row - 1, col: col + 1, IsVertical: true };
        const l7: LinkLocation = { row: row + 1, col: col, IsVertical: true };
        const l8: LinkLocation = { row: row + 1, col: col + 1, IsVertical: true };

        puzzle = this.solveForCorner(puzzle, l1, l5, l3, l6, l2, l7);
        puzzle = this.solveForCorner(puzzle, l2, l7, l1, l5, l4, l8);
        puzzle = this.solveForCorner(puzzle, l3, l6, l4, l8, l1, l5);
        puzzle = this.solveForCorner(puzzle, l4, l8, l2, l7, l3, l6);

        return puzzle;
    }

    private solveForCorner(puzzle: Puzzle,
                           cnr1: LinkLocation, cnr2: LinkLocation,
                           plus90Cnr1: LinkLocation, plus90Cnr2: LinkLocation,
                           neg90Cnr1: LinkLocation, neg90Cnr2: LinkLocation) {
        if (puzzle.getLinkState(cnr1) === LINK_STATE_X
            && puzzle.getLinkState(cnr2) === LINK_STATE_X) {
            if (puzzle.getLinkState(plus90Cnr1) === LINK_STATE_X) {
                puzzle = puzzle.optionalSetLinkTo(plus90Cnr2, LINK_STATE_SET);
            } else if (puzzle.getLinkState(plus90Cnr2) === LINK_STATE_X) {
                puzzle = puzzle.optionalSetLinkTo(plus90Cnr1, LINK_STATE_SET);
            }

            if (puzzle.getLinkState(neg90Cnr1) === LINK_STATE_X) {
                puzzle = puzzle.optionalSetLinkTo(neg90Cnr2, LINK_STATE_SET);
            } else if (puzzle.getLinkState(neg90Cnr2) === LINK_STATE_X) {
                puzzle = puzzle.optionalSetLinkTo(neg90Cnr1, LINK_STATE_SET);
            }
        }
        return puzzle;
    }

}
