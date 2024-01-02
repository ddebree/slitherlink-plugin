import {LINK_STATE_SET, LINK_STATE_UNSET, LINK_STATE_X, Puzzle} from "./Puzzle.class";

//The data objects that are used internally by the game engine
declare class Status {
    public cellHorizontalStatus: number[][];
    public cellVerticalStatus: number[][];
}
declare class Game {
    public static puzzleWidth: number;
    public static puzzleHeight: number;
    public static task: number[][];
    public static currentState: Status;

    public static setState(state: string): void;
}

export class GameBridge {

    public readPuzzleFromGame(): Puzzle | null {
        const height = Game.puzzleHeight;
        const width = Game.puzzleWidth;

        console.log("Data from the internal Game object",
            {
                "width": width,
                "height": height,
                "task": Game.task,
                "cellHorizontalStatus": Game.currentState.cellHorizontalStatus,
                "cellVerticalStatus": Game.currentState.cellVerticalStatus
            });

        const cellMap: number[][] = Array.from(Array(height), () => new Array(width));
        const horizontalMap: string[][] = Array.from(Array(height + 1), () => new Array(width));
        const verticalMap: string[][] = Array.from(Array(height), () => new Array(width+1));

        for (var row = 0; row < height; row++) {
            for (var col = 0; col < width; col++) {
                cellMap[row][col] = Game.task[row][col];
            }
        }
        for (var row = 0; row < height + 1; row++) {
            for (var col = 0; col < width; col++) {
                const linkValue = Game.currentState.cellHorizontalStatus[row][col];
                horizontalMap[row][col] = this.convertLnkStateFromGame(linkValue);
            }
        }
        for (var row = 0; row < height; row++) {
            for (var col = 0; col < width + 1; col++) {
                const linkValue = Game.currentState.cellVerticalStatus[row][col];
                verticalMap[row][col] = this.convertLnkStateFromGame(linkValue);
            }
        }
        return new Puzzle(cellMap, horizontalMap, verticalMap);
    }

    private convertLnkStateFromGame(linkValue: number) {
        if (linkValue == 1) {
            return LINK_STATE_SET;
        } else if (linkValue == 2) {
            return LINK_STATE_X;
        } else {
            return LINK_STATE_UNSET;
        }
    }

    public writePuzzleToGame(puzzle: Puzzle) {
        var stateString = "";

        for (var row = 0; row < puzzle.getHeight() + 1; row++) {
            for (var col = 0; col < puzzle.getWidth(); col++) {
                stateString += this.convertLinkStateToGame(puzzle.horizontalMap[row][col]);
            }
        }
        for (var row = 0; row < puzzle.getHeight(); row++) {
            for (var col = 0; col < puzzle.getWidth() + 1; col++) {
                stateString += this.convertLinkStateToGame(puzzle.verticalMap[row][col]);
            }
        }
        stateString += "|";

        console.log("Writing Data to the internal Game object",
            {
                "puzzle": puzzle,
                "stateString": stateString,
            });
        Game.setState(stateString);
    }

    private convertLinkStateToGame(input: string): string {
        if (input === LINK_STATE_SET) {
            return "y";
        } else if (input === LINK_STATE_X) {
            return "x";
        } else {
            return "n";
        }
    }
}