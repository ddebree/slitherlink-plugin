import { Puzzle } from "./Puzzle.class";
import { FillInLinksStrategy } from "./strategies/FillInLinksStrategy.class";
import { AbstractStrategy } from "./strategies/AbstractStrategy.class";
import { FillInXsStrategy } from "./strategies/FillInXsStrategy.class";
import { AdjacentThreesStrategy } from "./strategies/AdjacentThreesStrategy.class";
import { FillInXsLinks } from "./strategies/FillInXsLinks.class";

export class Solver {

    private strategies: AbstractStrategy[] = [
        new FillInLinksStrategy(),
        new FillInXsStrategy(),
        new AdjacentThreesStrategy(),
        new FillInXsLinks()
    ];

    public solve(inputPuzzle: Puzzle): Puzzle {
        var puzzle = inputPuzzle;
        for (const strategy of this.strategies) {
            puzzle = strategy.applyToPuzzle(puzzle);
        }
        return puzzle;
    }

}