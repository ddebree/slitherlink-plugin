import {LINK_STATE_SET, LINK_STATE_UNSET, LINK_STATE_X, LinkLocation, Puzzle} from "../Puzzle.class";
import { AbstractCellWithValueStrategy } from "./AbstractStrategy.class";

/**
 * This strategy handles the case of a cell with a 2 in it:
 *  - where a link coming into one of the corners and xs blocks the direction the path could take
 */
export class Cell2Strategy extends AbstractCellWithValueStrategy {

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
        // The links around the cell:
        const linkA: LinkLocation = { row: row, col: col, IsVertical: true };
        const linkB: LinkLocation = { row: row, col: col, IsVertical: false };
        const linkC: LinkLocation = { row: row, col: col + 1, IsVertical: true };
        const linkD: LinkLocation = { row: row + 1, col: col, IsVertical: false };

        puzzle = this.solveForCorner(puzzle, l1, l5, l3, l6, l2, l7);
        puzzle = this.solveForCorner(puzzle, l2, l7, l1, l5, l4, l8);
        puzzle = this.solveForCorner(puzzle, l3, l6, l4, l8, l1, l5);
        puzzle = this.solveForCorner(puzzle, l4, l8, l2, l7, l3, l6);

        //      l5  l6
        //  l1  . b . l3
        //      a 2 c
        //  l2  . d . l4
        //      l7  l8

        if (puzzle.countAroundCell(row, col, LINK_STATE_X) === 1
            && puzzle.countAroundCell(row, col, LINK_STATE_SET) === 0) {
            puzzle = this.solveForSingleX(puzzle, linkA, l3, l6, linkD, l4, l8, linkB);
            puzzle = this.solveForSingleX(puzzle, linkB, l2, l7, linkC, l4, l8, linkA);
            puzzle = this.solveForSingleX(puzzle, linkC, l1, l5, linkD, l2, l7, linkB);
            puzzle = this.solveForSingleX(puzzle, linkD, l1, l5, linkC, l3, l6, linkA);
        }

        return puzzle;
    }

    // If there is Xs around a corner, we know there is only two possible paths around this cell
    // Both paths start and end at the same place
    // If these start and end points only have one possible option then set it
    // Example:
    //  Input:                 Result:
    //      X                     X
    //    X .   .               X .   .
    //        2                     2
    //    X .   .               X .   .
    //                            |
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

    // If the cell only has one X, and there is a link entering the corner of the cell,
    // We can infer the state of one link:
    // Example:
    //  Input:                 Result:
    //      .   .                 .---.
    //        2 X                   2 X
    //   ---.   .              ---.   .
    //                            X
    private solveForSingleX(puzzle: Puzzle,
                            oppositeSideLink: LinkLocation,
                            cnr1a: LinkLocation, cnr1b: LinkLocation, cellLink1: LinkLocation,
                            cnr2a: LinkLocation, cnr2b: LinkLocation, cellLink2: LinkLocation) {
        if (puzzle.getLinkState(oppositeSideLink) === LINK_STATE_X) {
            if (puzzle.getLinkState(cnr1a) == LINK_STATE_SET) {
                puzzle = puzzle.optionalSetLinkTo(cnr1b, LINK_STATE_X);
                puzzle = puzzle.optionalSetLinkTo(cellLink1, LINK_STATE_SET);
            } else if (puzzle.getLinkState(cnr1b) == LINK_STATE_SET) {
                puzzle = puzzle.optionalSetLinkTo(cnr1a, LINK_STATE_X);
                puzzle = puzzle.optionalSetLinkTo(cellLink1, LINK_STATE_SET);
            }

            if (puzzle.getLinkState(cnr2a) == LINK_STATE_SET) {
                puzzle = puzzle.optionalSetLinkTo(cnr2b, LINK_STATE_X);
                puzzle = puzzle.optionalSetLinkTo(cellLink2, LINK_STATE_SET);
            } else if (puzzle.getLinkState(cnr2b) == LINK_STATE_SET) {
                puzzle = puzzle.optionalSetLinkTo(cnr2a, LINK_STATE_X);
                puzzle = puzzle.optionalSetLinkTo(cellLink2, LINK_STATE_SET);
            }
        }
        return puzzle;
    }

}
