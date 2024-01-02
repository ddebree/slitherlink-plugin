import {LINK_STATE_X, Puzzle} from "./Puzzle.class";
import {FillInLinks} from "./operations/FillInLinks.class";

export class Solver {

    public solve(puzzle: Puzzle): Puzzle {
        return new FillInLinks().applyToPuzzle(puzzle);
    }

}