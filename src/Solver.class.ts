import { Puzzle } from "./Puzzle.class";
import { FillInLinks } from "./operations/FillInLinks.class";
import { Operation } from "./operations/Operation.class";

export class Solver {

    private strategies: Operation[] = [
        new FillInLinks()
    ];

    public solve(inputPuzzle: Puzzle): Puzzle {
        var puzzle = inputPuzzle;
        for (const strategy of this.strategies) {
            puzzle = strategy.applyToPuzzle(puzzle);
        }
        return puzzle;
    }

}