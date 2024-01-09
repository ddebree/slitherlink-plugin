import { Dot, LINK_STATE_SET, LINK_STATE_X, Puzzle } from "../Puzzle.class";
import { AbstractStrategy } from "./AbstractStrategy.class";

export class AvoidMultipleLoopsStrategy extends AbstractStrategy {

    public applyToPuzzle(puzzle: Puzzle): Puzzle {
        const endpoints = new Set<Dot>();
        for (var row = 0; row < puzzle.getHeight() + 1; row++) {
            for (var col = 0; col < puzzle.getWidth() + 1; col++) {
                if (puzzle.countAroundDot(row, col, LINK_STATE_SET) == 1) {
                    endpoints.add(new Dot(row, col));
                }
            }
        }
        //If there is less than 2 endpoints, we are likely in the end stages of the game:
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
