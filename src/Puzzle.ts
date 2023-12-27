export class Puzzle {
    constructor(public cellMap: number[][],
                public horizontalMap: string[][],
                public verticalMap: string[][]) {
        console.log("Starting puzzle");
        console.log("Cell Map", cellMap);
        console.log("Horizontal Lines", horizontalMap);
        console.log("Vertical Lines", verticalMap);
    }

}