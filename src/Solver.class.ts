import { Puzzle } from "./Puzzle.class";
import { AbstractStrategy } from "./strategies/AbstractStrategy.class";
import { AvoidMultipleLoopsStrategy } from "./strategies/AvoidMultipleLoopsStrategy.class";
import { DiagonalOnesStrategy } from "./strategies/DiagonalOnesStrategy.class";
import { DiagonalThreesStrategy } from "./strategies/DiagonalThreesStrategy.class";
import { FillInLinksStrategy } from "./strategies/FillInLinksStrategy.class";
import { FillInXsLinks } from "./strategies/FillInXsLinks.class";
import { FillInXsStrategy } from "./strategies/FillInXsStrategy.class";
import { HorizontalOrVerticalThreesStrategy } from "./strategies/HorizontalOrVerticalThreesStrategy.class";
import { Cell1Strategy } from "./strategies/Cell1Strategy.class";
import { Cell2Strategy } from "./strategies/Cell2Strategy.class";
import { Cell3Strategy } from "./strategies/Cell3Strategy.class";

export class Solver {

    private strategies: AbstractStrategy[] = [
        new AvoidMultipleLoopsStrategy(),
        new DiagonalOnesStrategy(),
        new DiagonalThreesStrategy(),
        new FillInLinksStrategy(),
        new FillInXsLinks(),
        new FillInXsStrategy(),
        new HorizontalOrVerticalThreesStrategy(),
        new Cell1Strategy(),
        new Cell2Strategy(),
        new Cell3Strategy(),
    ];

    public solve(inputPuzzle: Puzzle): Puzzle {
        var puzzle = inputPuzzle;
        for (let i = 0; i < 10; i++) {
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