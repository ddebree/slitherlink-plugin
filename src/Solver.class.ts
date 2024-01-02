import { Puzzle } from "./Puzzle.class";
import { FillInLinksStrategy } from "./strategies/FillInLinksStrategy.class";
import { AbstractStrategy } from "./strategies/AbstractStrategy.class";

export class Solver {

    private strategies: AbstractStrategy[] = [
        new FillInLinksStrategy()
    ];

    public solve(inputPuzzle: Puzzle): Puzzle {
        var puzzle = inputPuzzle;
        for (const strategy of this.strategies) {
            puzzle = strategy.applyToPuzzle(puzzle);
        }
        return puzzle;
    }

}