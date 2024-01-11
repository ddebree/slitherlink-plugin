import { Puzzle } from "./Puzzle.class";
import { FillInLinksStrategy } from "./strategies/FillInLinksStrategy.class";
import { AbstractStrategy } from "./strategies/AbstractStrategy.class";
import { FillInXsStrategy } from "./strategies/FillInXsStrategy.class";
import { AdjacentThreesStrategy } from "./strategies/AdjacentThreesStrategy.class";
import { FillInXsLinks } from "./strategies/FillInXsLinks.class";
import { AvoidMultipleLoopsStrategy } from "./strategies/AvoidMultipleLoopsStrategy.class";
import { LinkedThreesStrategy } from "./strategies/LinkedThreesStrategy.class";

export class Solver {

    private strategies: AbstractStrategy[] = [
        new FillInLinksStrategy(),
        new FillInXsStrategy(),
        new AdjacentThreesStrategy(),
        new FillInXsLinks(),
        new AvoidMultipleLoopsStrategy(),
        new LinkedThreesStrategy(),
    ];

    public solve(inputPuzzle: Puzzle): Puzzle {
        var puzzle = inputPuzzle;
        for (let i = 0; i < 20; i++) {
            console.log("Starting Solving Iteration " + i);
            const puzzleAtStart = puzzle;
            for (const strategy of this.strategies) {
                puzzle = strategy.applyToPuzzle(puzzle);
            }
            if (puzzleAtStart === puzzle) {
                console.log("No more changes being made. Just returning what we have");
                return puzzle;
            }
        }
        return puzzle;
    }

}