import { GameBridge } from "./GameBridge.class";
import { Solver } from "./Solver.class";

function solve() {
    const gameBridge = new GameBridge();
    const puzzle = gameBridge.readPuzzleFromGame();
    console.log("Input puzzle", puzzle);
    if (puzzle) {
        const solvedPuzzle = new Solver().solve(puzzle);
        gameBridge.writePuzzleToGame(solvedPuzzle);
    }
}

const puzzleInfo = document.querySelector("#btnReady");
if (puzzleInfo) {
    const button = document.createElement("input");
    button.classList.add("button");
    button.type = "button";
    button.value = "Solve!";
    button.title = "Solve!";
    button.addEventListener("click", (event) => {
        solve();
        event.stopPropagation();
    }, false);

    puzzleInfo.insertAdjacentElement("afterend", button);
} else {
    console.log("Unable to find the button container");
}