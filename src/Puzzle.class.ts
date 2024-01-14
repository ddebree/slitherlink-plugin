export const LINK_STATE_SET = "+";
export const LINK_STATE_UNSET = " ";
export const LINK_STATE_X = "x";

export class Dot {
    constructor(public row: number, public col: number) {
    }
}

export interface LinkLocation {
    row: number,
    col: number,
    IsVertical: boolean
}

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
        const verticalAbove = this.getVerticalLinkState(row - 1, col);
        const verticalBelow = this.getVerticalLinkState(row, col);
        const horizontalLeft = this.getHorizontalLinkState(row, col - 1);
        const horizontalRight = this.getHorizontalLinkState(row, col);

        return (verticalAbove === toCount ? 1 : 0) +
            (verticalBelow === toCount ? 1 : 0) +
            (horizontalLeft === toCount ? 1 : 0) +
            (horizontalRight === toCount ? 1 : 0);
    }

    public getVerticalLinkState(row: number, col: number) {
        if (this.isInside(this.verticalMap, row, col)) {
            return this.verticalMap[row][col];
        } else {
            return LINK_STATE_X
        }
    }

    public getHorizontalLinkState(row: number, col: number) {
        if (this.isInside(this.horizontalMap, row, col)) {
            return this.horizontalMap[row][col];
        } else {
            return LINK_STATE_X
        }
    }

    public getLinkState(linkLocation: LinkLocation) {
        if (linkLocation.IsVertical) {
            return this.getVerticalLinkState(linkLocation.row, linkLocation.col);
        } else {
            return this.getHorizontalLinkState(linkLocation.row, linkLocation.col);
        }
    }

    public getLinkedNeighbours(row: number, col: number): Dot[] {
        //Note that row and col could be outside the bounds of the grid
        // --- . ----- .
        //     |       |
        // --- O ----- .
        //     | (r,c) |
        // --- . ----- .
        const verticalAbove = this.getVerticalLinkState(row - 1, col);
        const verticalBelow = this.getVerticalLinkState(row, col);
        const horizontalLeft = this.getHorizontalLinkState(row, col - 1);
        const horizontalRight = this.getHorizontalLinkState(row, col);

        const neighbours: Dot[] = [];
        if (verticalAbove === LINK_STATE_SET) {
            neighbours.push(new Dot(row - 1, col));
        }
        if (verticalBelow === LINK_STATE_SET) {
            neighbours.push(new Dot(row + 1, col));
        }
        if (horizontalLeft === LINK_STATE_SET) {
            neighbours.push(new Dot(row, col - 1));
        }
        if (horizontalRight === LINK_STATE_SET) {
            neighbours.push(new Dot(row, col + 1));
        }
        return neighbours;
    }

    public getOtherEndOfPath(endpoint: Dot) {
        var neighbours = this.getLinkedNeighbours(endpoint.row, endpoint.col);
        if (neighbours.length != 1) {
            //Something weird going on here...
            return null;
        }
        var prevStep = endpoint;
        var nextStep = neighbours[0];
        while (true) {
            neighbours = this.getLinkedNeighbours(nextStep.row, nextStep.col);
            if (neighbours.length == 2) {
                //Intermediate dot along the path
                if (prevStep.row == neighbours[0].row && prevStep.col == neighbours[0].col) {
                    //We already saw this neighbour[0].
                    prevStep = nextStep;
                    nextStep = neighbours[1];
                } else {
                    prevStep = nextStep;
                    nextStep = neighbours[0];
                }
            } else if (neighbours.length == 1) {
                //We found the other end:
                return nextStep;
            } else {
                //We found a dot with non-2 number of links (weird):
                return null;
            }
        }
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

    public optionalSetLinkTo(location: LinkLocation, newValue: string) {
        if (location.IsVertical) {
            return this.optionalSetVerticalLinkTo(location.row, location.col, newValue);
        } else {
            return this.optionalSetHorizontalLinkTo(location.row, location.col, newValue);
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