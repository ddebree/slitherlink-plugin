export class Puzzle {
    constructor(public cellMap: number[][],
                public horizontalMap: string[][],
                public verticalMap: string[][]) {
        console.log("Starting puzzle");
        console.log("Cell Map", cellMap);
        console.log("Horizontal Lines", horizontalMap);
        console.log("Vertical Lines", verticalMap);
    }

    public getHeight(): number {
        return this.cellMap.length;
    }

    public getWidth(): number {
        return this.cellMap[0].length;
    }

    public setVerticalLinkToX(row: number, col: number) {
        if (this.verticalMap[row][col] === " ") {
            const verticalMapCopy = this.copyLinkMap(this.verticalMap);
            return new Puzzle(this.cellMap, this.horizontalMap, this.verticalMap);
        } else {
            return this;
        }
    }

    public setHorizontalLinkToX(row: number, col: number) {
        return this;
    }

    private copyLinkMap(input: string[][]): string[][] {
        return input;
    }

}