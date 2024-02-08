import { Dot, LINK_STATE_SET, LINK_STATE_X, Puzzle } from "../Puzzle.class";
import { AbstractStrategy } from "./AbstractStrategy.class";


/**
 * This strategy places 'x' values between dots that are joined by the same path,
 * to prevent multiple closed loops from being created.
 */
export class AvoidMultipleLoopsStrategy extends AbstractStrategy {

    public applyToPuzzle(puzzle: Puzzle): Puzzle {
        const endpoints = new Set<Dot>();
        for (var row = 0; row < puzzle.getPuzzleContext().getHeight() + 1; row++) {
            for (var col = 0; col < puzzle.getPuzzleContext().getWidth() + 1; col++) {
                if (puzzle.countAroundDot(row, col, LINK_STATE_SET) == 1) {
                    endpoints.add(new Dot(row, col));
                }
            }
        }
        //If there is less than 2 endpoints, it means there is only one path
        if (endpoints.size <= 2) {
            return puzzle;
        }
        for (var dot of endpoints) {
            const otherEndOfPath = puzzle.getOtherEndOfPath(dot);
            if (otherEndOfPath) {
                const dRow = otherEndOfPath.row - dot.row;
                const dCol = otherEndOfPath.col - dot.col;
                if ((dRow == 0) && (dCol == 1)) {
                    puzzle = puzzle.optionalSetHorizontalLinkTo(dot.row, dot.col, LINK_STATE_X);
                } else if ((dRow == 1) && (dCol == 0)) {
                    puzzle = puzzle.optionalSetVerticalLinkTo(dot.row, dot.col, LINK_STATE_X);
                }
            } else {
                console.log("Unable to find other end of path starting at", dot);
            }
        }
        return puzzle;
    }

}
