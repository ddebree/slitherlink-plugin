import {Puzzle} from "./Puzzle";

export class Parser {

    public parse(): Puzzle | null {
        const puzzleContainer = document.querySelector('#puzzleContainer');
        console.log("Finding puzzleContainer")
        if (puzzleContainer) {
            const boardBack = puzzleContainer.querySelector(".board-back");

            if (boardBack) {
                const cellMap = this.getCellValues(boardBack);

                const horizontalMap = this.getLineMap(boardBack, ".loop-horizontal", "-");

                const verticalMap = this.getLineMap(boardBack, ".loop-vertical", "|");

                return new Puzzle(cellMap, horizontalMap, verticalMap);
            }
        }
        console.log("unable to find puzzle container");
        return null;
    }

    private getCellValues(boardBack: Element): number[][] {
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

    private getLineMap(boardBack: Element, selector: string, marker: string): string[][] {
        const mapWithCoords = new Map<number, Map<number, string>>();
        const lines = boardBack.querySelectorAll(selector);
        const topsSet = new Set<number>();
        const leftsSet = new Set<number>();
        lines.forEach(line => {
            const top = line.getBoundingClientRect().top;
            const left = line.getBoundingClientRect().left;
            topsSet.add(top);
            leftsSet.add(left);
            if ( ! mapWithCoords.has(top)) {
                mapWithCoords.set(top, new Map());
            }
            if (line.classList.contains("cell-on")) {
                mapWithCoords.get(top)?.set(left, marker);
            } else if (line.classList.contains("cell-off")) {
                mapWithCoords.get(top)?.set(left, " ");
            } else if (line.classList.contains("cell-x")) {
                mapWithCoords.get(top)?.set(left, "x");
            }
        });

        const tops = Array.from(topsSet).sort((a: number, b: number) => a - b);
        const lefts = Array.from(leftsSet).sort((a: number, b: number) => a - b);

        const results: string[][] = Array.from(Array(tops.length), () => new Array(lefts.length))
        mapWithCoords.forEach( (internalMap, topAndBottom, map) => {
            topsSet.add(topAndBottom);
            internalMap.forEach( (value, leftAndRight, map) => {
                const topIndex = tops.indexOf(topAndBottom);
                const leftIndex = lefts.indexOf(leftAndRight);
                results[topIndex][leftIndex] = value;
            });
        });

        return results;
    }

}