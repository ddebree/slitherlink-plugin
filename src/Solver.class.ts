import { Puzzle } from "./Puzzle.class";
import { FillInLinksStrategy } from "./strategies/FillInLinksStrategy.class";
import { AbstractStrategy } from "./strategies/AbstractStrategy.class";
import {FillInXsStrategy} from "./strategies/FillInXsStrategy.class";
import {AdjacentThreesStrategy} from "./strategies/AdjacentThreesStrategy.class";

export class Solver {

    private strategies: AbstractStrategy[] = [
        new FillInLinksStrategy(),
        new FillInXsStrategy(),
        new AdjacentThreesStrategy()
    ];

    public solve(inputPuzzle: Puzzle): Puzzle {
        var puzzle = inputPuzzle;
        for (const strategy of this.strategies) {
            puzzle = strategy.applyToPuzzle(puzzle);
        }
        return puzzle;
    }

}