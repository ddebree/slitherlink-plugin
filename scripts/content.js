const puzzleContainer = document.querySelector('#puzzleContainer');
console.log("Finding puzzleContainer")
//
// // `document.querySelector` may return null if the selector doesn't match anything.
if (puzzleContainer) {
  const boardBack = puzzleContainer.querySelector(".board-back");

  const cellMap = new Map();
  const topsSet = new Set();
  const bottomsSet = new Set();
  const leftsSet = new Set();
  const rightsSet = new Set();

  boardBack.querySelectorAll(".loop-task-cell").forEach(cell => {
      const top = parseInt(cell.getBoundingClientRect().top);
      const bottom = parseInt(cell.getBoundingClientRect().bottom);
      const left = parseInt(cell.getBoundingClientRect().left);
      const right = parseInt(cell.getBoundingClientRect().right);
      topsSet.add(top);
      bottomsSet.add(bottom);
      leftsSet.add(left);
      rightsSet.add(right);

      if (['0', '1', '2', '3'].includes(cell.innerText)) {
          if ( ! cellMap.has(top)) {
              cellMap.set(top, new Map());
          }
          cellMap.get(top).set(left, parseInt(cell.innerText));
      }
      console.log("Cell", cell);
  });
  const tops = Array.from(topsSet).sort((a, b) => a - b);
  const bottoms = Array.from(bottomsSet).sort((a, b) => a - b);
  const lefts = Array.from(leftsSet).sort((a, b) => a - b);
  const rights = Array.from(rightsSet).sort((a, b) => a - b);

  console.log("Cells", cellMap);
  console.log("Tops", tops);
  console.log("Bottoms", bottoms);
  console.log("Lefts", lefts);
  console.log("Rights", rights);

  // console.log("Clicking");
  // elem = document.elementFromPoint(lefts[0], (tops[0] + bottoms[0]) / 2 );
  // elem.click();
} else {
    console.log("unable to find puzzle container")
}
