import {LINK_STATE_SET, LINK_STATE_X, LinkLocation, Puzzle} from "../Puzzle.class";
import { AbstractCellWithValueStrategy } from "./AbstractStrategy.class";

/**
 * This strategy handles the case of a cell with a 1 in it:
 *  - where a link coming into one of the corners and xs blocks the direction the path could take
 *  - where a corner is surrounded by two xs
 */
export class OneCellStrategy extends AbstractCellWithValueStrategy {

    public applyToPuzzleForCell(puzzle: Puzzle, row: number, col: number, cellValue: number): Puzzle {
        if (cellValue != 1) {
            return puzzle;
        }
        if (puzzle.countAroundCell(row, col, LINK_STATE_SET) === 1) {
            return puzzle;
        }
        // Key to the links around this 1 cell:
        //      l5  l6
        //  l1  . b . l3
        //      a 1 c
        //  l2  . d . l4
        //      l7  l8

        //Horizontal links:
        const l1 = puzzle.getHorizontalLinkState(row, col - 1);
        const l2 = puzzle.getHorizontalLinkState(row + 1, col - 1);
        const l3 = puzzle.getHorizontalLinkState(row, col + 1);
        const l4 = puzzle.getHorizontalLinkState(row + 1, col + 1);
        //Vertical links:
        const l5 = puzzle.getVerticalLinkState(row - 1, col);
        const l6 = puzzle.getVerticalLinkState(row - 1, col + 1);
        const l7 = puzzle.getVerticalLinkState(row + 1, col);
        const l8 = puzzle.getVerticalLinkState(row + 1, col + 1);

        const linkA: LinkLocation = { row: row, col: col, IsVertical: true };
        const linkB: LinkLocation = { row: row, col: col, IsVertical: false };
        const linkC: LinkLocation = { row: row, col: col + 1, IsVertical: true };
        const linkD: LinkLocation = { row: row + 1, col: col, IsVertical: false };

        //Link coming into one of the corner points, with an X blocking it going off away from this 1
        if ((l1 === LINK_STATE_SET && l5 === LINK_STATE_X) ||
            (l5 === LINK_STATE_SET && l1 === LINK_STATE_X)) {
            puzzle = puzzle.optionalSetLinkTo(linkC, LINK_STATE_X);
            puzzle = puzzle.optionalSetLinkTo(linkD, LINK_STATE_X);
        }
        if ((l2 === LINK_STATE_SET && l7 === LINK_STATE_X) ||
            (l7 === LINK_STATE_SET && l2 === LINK_STATE_X)) {
            puzzle = puzzle.optionalSetLinkTo(linkB, LINK_STATE_X);
            puzzle = puzzle.optionalSetLinkTo(linkC, LINK_STATE_X);
        }
        if ((l3 === LINK_STATE_SET && l6 === LINK_STATE_X) ||
            (l6 === LINK_STATE_SET && l3 === LINK_STATE_X)){
            puzzle = puzzle.optionalSetLinkTo(linkA, LINK_STATE_X);
            puzzle = puzzle.optionalSetLinkTo(linkD, LINK_STATE_X);
        }
        if ((l4 === LINK_STATE_SET && l8 === LINK_STATE_X) ||
            (l8 === LINK_STATE_SET && l4 === LINK_STATE_X)){
            puzzle = puzzle.optionalSetLinkTo(linkA, LINK_STATE_X);
            puzzle = puzzle.optionalSetLinkTo(linkB, LINK_STATE_X);
        }

        //A corner point surrounded by xs:
        if (l1 === LINK_STATE_X && l5 === LINK_STATE_X) {
            puzzle = puzzle.optionalSetLinkTo(linkA, LINK_STATE_X);
            puzzle = puzzle.optionalSetLinkTo(linkB, LINK_STATE_X);
        }
        if (l2 === LINK_STATE_X && l7 === LINK_STATE_X) {
            puzzle = puzzle.optionalSetLinkTo(linkA, LINK_STATE_X);
            puzzle = puzzle.optionalSetLinkTo(linkD, LINK_STATE_X);
        }
        if (l3 === LINK_STATE_X && l6 === LINK_STATE_X){
            puzzle = puzzle.optionalSetLinkTo(linkB, LINK_STATE_X);
            puzzle = puzzle.optionalSetLinkTo(linkC, LINK_STATE_X);
        }
        if (l4 === LINK_STATE_X && l8 === LINK_STATE_X){
            puzzle = puzzle.optionalSetLinkTo(linkC, LINK_STATE_X);
            puzzle = puzzle.optionalSetLinkTo(linkD, LINK_STATE_X);
        }
        return puzzle;
    }

}
