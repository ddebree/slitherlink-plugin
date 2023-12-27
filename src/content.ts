import { Parser } from "./parser";

const puzzle = new Parser().parse();
console.log("Puzzle", puzzle);

const puzzleInfo = document.querySelector(".puzzleInfo");

if (puzzleInfo) {
    const button = document.createElement("button");
    // Use the same styling as the publish information in an article's header
    button.classList.add("color-secondary-text", "type--caption");
    button.textContent = `Solve!`;

    // <input class="button" type="submit" name="ready" id="btnReady" value="   Done   " title="Done [Enter]">

    button.addEventListener("click", (event) => {
        alert("Something.");
        event.stopPropagation();
    }, false);

    puzzleInfo.insertAdjacentElement("afterend", button);
} else {
    console.log("Unable to find the button container");
}