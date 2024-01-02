export const LINK_STATE_SET = "+";
export const LINK_STATE_UNSET = " ";
export const LINK_STATE_X = "x";

export class Puzzle {
    constructor(public cellMap: number[][],
                public horizontalMap: string[][],
                public verticalMap: string[][]) {
    }

    public getHeight(): number {
        return this.cellMap.length;
    }

    public getWidth(): number {
        return this.cellMap[0].length;
    }

    public countAroundCell(row: number, col: number, toCount: string):number {
        return (this.verticalMap[row][col] === toCount ? 1 : 0) +
                    (this.verticalMap[row][col + 1] === toCount ? 1 : 0) +
                    (this.horizontalMap[row][col] === toCount ? 1 : 0) +
                    (this.horizontalMap[row + 1][col] === toCount ? 1 : 0);
    }

    public optionalSetVerticalLinkTo(row: number, col: number, newValue: string) {
        if (this.verticalMap[row][col] === LINK_STATE_UNSET) {
            const verticalMapCopy = this.copyLinkMap(this.verticalMap);
            verticalMapCopy[row][col] = newValue;
            return new Puzzle(this.cellMap, this.horizontalMap, verticalMapCopy);
        } else {
            return this;
        }
    }

    public optionalSetHorizontalLinkTo(row: number, col: number, newValue: string) {
        if (this.horizontalMap[row][col] === LINK_STATE_UNSET) {
            const horizontalMapCopy = this.copyLinkMap(this.horizontalMap);
            horizontalMapCopy[row][col] = newValue;
            return new Puzzle(this.cellMap, horizontalMapCopy, this.verticalMap);
        } else {
            return this;
        }
    }

    private copyLinkMap(input: string[][]): string[][] {
        const result =  Array.from(Array(input.length), () => new Array(input[0].length));
        for (var row = 0; row < input.length; row++) {
            for (var col = 0; col < input[0].length; col++) {
                result[row][col] = input[row][col];
            }
        }
        return result;
    }

}