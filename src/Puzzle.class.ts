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

    public getCellValue(row: number, col: number) {
        return this.cellMap[row][col];
    }

    public isValidCell(row: number, col: number) {
        return row >= 0 && col >= 0
            && row < this.getHeight() && col < this.getWidth();
    }

    public getCellValueWithZeroOutsideBoard(row: number, col: number) {
        if (row >= 0 && row < this.getHeight() && col >= 0 && col < this.getWidth()) {
            return this.cellMap[row][col];
        } else {
            return 0;
        }
    }

    public countAroundCell(row: number, col: number, toCount: string):number {
        return (this.verticalMap[row][col] === toCount ? 1 : 0) +
                    (this.verticalMap[row][col + 1] === toCount ? 1 : 0) +
                    (this.horizontalMap[row][col] === toCount ? 1 : 0) +
                    (this.horizontalMap[row + 1][col] === toCount ? 1 : 0);
    }

    public countAroundDot(row: number, col: number, toCount: string):number {
        //Note that row and col could be outside the bounds of the grid

        // --- . ----- .
        //     |       |
        // --- O ----- .
        //     | (r,c) |
        // --- . ----- .

        //Start by assuming we are outside the bounds of the grid:
        var verticalAbove = LINK_STATE_X;
        var verticalBelow = LINK_STATE_X;
        var horizontalLeft = LINK_STATE_X;
        var horizontalRight = LINK_STATE_X;

        if (this.isInside(this.verticalMap, row - 1, col)) {
            verticalAbove = this.verticalMap[row - 1][col];
        }
        if (this.isInside(this.verticalMap, row, col)) {
            verticalBelow = this.verticalMap[row][col];
        }
        if (this.isInside(this.horizontalMap, row, col - 1)) {
            horizontalLeft = this.horizontalMap[row][col - 1];
        }
        if (this.isInside(this.horizontalMap, row, col)) {
            horizontalRight = this.horizontalMap[row][col];
        }

        return (verticalAbove === toCount ? 1 : 0) +
            (verticalBelow === toCount ? 1 : 0) +
            (horizontalLeft === toCount ? 1 : 0) +
            (horizontalRight === toCount ? 1 : 0);
    }

    public optionalSetVerticalLinkTo(row: number, col: number, newValue: string) {
        if (this.isOutside(this.verticalMap, row, col)) {
            return this;
        }
        if (this.verticalMap[row][col] === LINK_STATE_UNSET) {
            const verticalMapCopy = this.copyLinkMap(this.verticalMap);
            verticalMapCopy[row][col] = newValue;
            return new Puzzle(this.cellMap, this.horizontalMap, verticalMapCopy);
        } else {
            return this;
        }
    }

    public optionalSetHorizontalLinkTo(row: number, col: number, newValue: string) {
        if (this.isOutside(this.horizontalMap, row, col)) {
            return this;
        }
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

    private isInside(linkMap: string[][], row: number, col: number) {
        return row >= 0 && col >= 0 && row < linkMap.length && col < linkMap[0].length;
    }

    private isOutside(linkMap: string[][], row: number, col: number) {
        return row < 0 || col < 0 || row >= linkMap.length || col >= linkMap[0].length;
    }
}