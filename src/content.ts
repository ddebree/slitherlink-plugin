import { GameBridge } from "./GameBridge.class";
import { Solver } from "./Solver.class";

function solve(toDepth: number = 1000000) {
    const gameBridge = new GameBridge();
    const puzzle = gameBridge.readPuzzleFromGame();
    console.log("Input puzzle", puzzle);
    if (puzzle) {
        const solvedPuzzle = new Solver().solve(puzzle, toDepth);
        gameBridge.writePuzzleToGame(solvedPuzzle);
    }
}

const puzzleInfo = document.querySelector("#btnReady");
if (puzzleInfo) {
    const button = document.createElement("input");
    button.classList.add("button");
    button.type = "button";
    button.value = "Solve Single Step!";
    button.title = "Solve Single Step!";
    button.addEventListener("click", (event) => {
        solve(1);
        event.stopPropagation();
    }, false);

    puzzleInfo.insertAdjacentElement("afterend", button);

    const buttonSolveAll = document.createElement("input");
    buttonSolveAll.classList.add("button");
    buttonSolveAll.type = "button";
    buttonSolveAll.value = "Solve!";
    buttonSolveAll.title = "Solve!";
    buttonSolveAll.addEventListener("click", (event) => {
        solve();
        event.stopPropagation();
    }, false);

    puzzleInfo.insertAdjacentElement("afterend", buttonSolveAll);
} else {
    console.log("Unable to find the button container");
}