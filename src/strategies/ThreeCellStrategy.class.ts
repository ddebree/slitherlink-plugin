import {LINK_STATE_SET, LINK_STATE_X, LinkLocation, Puzzle} from "../Puzzle.class";
import { AbstractCellWithValueStrategy } from "./AbstractStrategy.class";

/**
 * This strategy handles the case where a '3' cell has two 'x' values
 * surrounding one corner, and the case where a '3' cell has a link
 * coming into one corner of the cell.
 */
export class ThreeCellStrategy extends AbstractCellWithValueStrategy {

    public applyToPuzzleForCell(puzzle: Puzzle, row: number, col: number, cellValue: number): Puzzle {
        if (cellValue != 3) {
            return puzzle;
        }
        // Key to the links around this 1 cell:
        //      l5  l6
        //  l1  . b . l3
        //      a 3 c
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

        //Look for xs around the corners:
        if (l1 === LINK_STATE_X && l5 === LINK_STATE_X) {
            puzzle = puzzle.optionalSetLinkTo(linkA, LINK_STATE_SET);
            puzzle = puzzle.optionalSetLinkTo(linkB, LINK_STATE_SET);
        }
        if (l6 === LINK_STATE_X && l3 === LINK_STATE_X) {
            puzzle = puzzle.optionalSetLinkTo(linkB, LINK_STATE_SET);
            puzzle = puzzle.optionalSetLinkTo(linkC, LINK_STATE_SET);
        }
        if (l4 === LINK_STATE_X && l8 === LINK_STATE_X) {
            puzzle = puzzle.optionalSetLinkTo(linkC, LINK_STATE_SET);
            puzzle = puzzle.optionalSetLinkTo(linkD, LINK_STATE_SET);
        }
        if (l7 === LINK_STATE_X && l2 === LINK_STATE_X) {
            puzzle = puzzle.optionalSetLinkTo(linkA, LINK_STATE_SET);
            puzzle = puzzle.optionalSetLinkTo(linkD, LINK_STATE_SET);
        }

        //Look for a link coming into one of the corners:
        if (l1 === LINK_STATE_SET || l5 === LINK_STATE_SET) {
            puzzle = puzzle.optionalSetLinkTo(linkC, LINK_STATE_SET);
            puzzle = puzzle.optionalSetLinkTo(linkD, LINK_STATE_SET);
        }
        if (l2 === LINK_STATE_SET || l7 === LINK_STATE_SET) {
            puzzle = puzzle.optionalSetLinkTo(linkB, LINK_STATE_SET);
            puzzle = puzzle.optionalSetLinkTo(linkC, LINK_STATE_SET);
        }
        if (l3 === LINK_STATE_SET || l6 === LINK_STATE_SET) {
            puzzle = puzzle.optionalSetLinkTo(linkA, LINK_STATE_SET);
            puzzle = puzzle.optionalSetLinkTo(linkD, LINK_STATE_SET);
        }
        if (l4 === LINK_STATE_SET || l8 === LINK_STATE_SET) {
            puzzle = puzzle.optionalSetLinkTo(linkA, LINK_STATE_SET);
            puzzle = puzzle.optionalSetLinkTo(linkB, LINK_STATE_SET);
        }
        return puzzle;
    }

}
