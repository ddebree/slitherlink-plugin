import { Puzzle } from "./Puzzle.class";

declare class Game {
    public static serializeState(): string;
    public static setState(state: string): void;
}

export class GameBridge {

    public readPuzzleFromGame(): Puzzle | null {
        const cellMap = this.getCellValues();

        if (cellMap) {
            const state = Game.serializeState();
            console.log("Got state from the game engine: ", state);

            if (state) {
                const width = cellMap.length;
                const height = cellMap[0].length;
                const horizontalMap = Array.from(Array(width+1), () => new Array(height));
                const verticalMap = Array.from(Array(width), () => new Array(height+1));

                var offset = 0;
                var row, col;
                for (row = 0; row < height + 1; row++) {
                    for (col = 0; col < width; col++) {
                        horizontalMap[row][col] = state.charAt(offset);
                        offset++
                    }
                }
                for (row = 0; row < height; row++) {
                    for (col = 0; col < width + 1; col++) {
                        verticalMap[row][col] = state.charAt(offset);
                        offset++;
                    }
                }
                return new Puzzle(cellMap, horizontalMap, verticalMap);
            } else {
                console.error("Unable to get the game state from the game engine");
            }
        }
        console.log("unable to find puzzle container");
        return null;
    }

    private getCellValues(): number[][] | null {
        const puzzleContainer = document.querySelector('#puzzleContainer');
        if (puzzleContainer) {
            const boardBack = puzzleContainer.querySelector(".board-back");

            if (boardBack) {
                console.log("Found the board in the html");
                const cells = boardBack.querySelectorAll(".loop-task-cell");

                const topsSet = new Set<number>();
                const leftsSet = new Set<number>();
                cells.forEach(cell => {
                    topsSet.add(cell.getBoundingClientRect().top);
                    leftsSet.add(cell.getBoundingClientRect().left);
                });
                const tops = Array.from(topsSet).sort((a: number, b: number) => a - b);
                const lefts = Array.from(leftsSet).sort((a: number, b: number) => a - b);

                const results = Array.from(Array(tops.length), () => new Array(lefts.length))
                cells.forEach(cell => {
                    const topIndex = tops.indexOf(cell.getBoundingClientRect().top);
                    const leftIndex = lefts.indexOf(cell.getBoundingClientRect().left);
                    if (['0', '1', '2', '3'].includes((cell as HTMLElement).innerText)) {
                        results[topIndex][leftIndex] = parseInt((cell as HTMLElement).innerText);
                    }
                });

                return results;
            }
        }
        return null;
    }

    public writePuzzleToGame(puzzle: Puzzle) {
        var stateString = "";

        for (var row = 0; row < puzzle.getHeight() + 1; row++)
            for (var col = 0; col < puzzle.getWidth(); col++)
                stateString += puzzle.horizontalMap[row][col];
        for (var row = 0; row < puzzle.getHeight(); row++)
            for (var col = 0; col < puzzle.getWidth() + 1; col++)
                stateString += puzzle.verticalMap[row][col];

        stateString += "|";

        console.log("Writing state string: ", stateString);
        Game.setState(stateString);
    }
}