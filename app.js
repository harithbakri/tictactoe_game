const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");
// let continueGame = false;

const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const selectedCells = new Array(9).fill("", 0, 9);
// const selectedCells = ["", "", "", "", "", "", "", "", ""];
// console.log(selectedCells);
let currentPlayer = "X";

//lets initialize the game
function initGame() {
  //   continueGame = true;
  cells.forEach((cell) => cell.addEventListener("click", cellClicked));
  restartBtn.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
}

function cellClicked() {
  //   console.dir(this);
  //   if (!continueGame) {
  //     alert("Game Over! Please Restart");
  //     return;
  //   }
  const cellNum = this.getAttribute("cellNum");
  //   console.log(cellNum);
  if (selectedCells[cellNum] == "") {
    selectedCells[cellNum] = currentPlayer;
    this.textContent = currentPlayer;
    // console.log(selectedCells);
    checkWinner();
  } else {
    alert("Already Clicked");
    return;
  }
}

function checkWinner() {
  let roundWon = false;
  //Loop through all winning combinations
  for (let i = 0; i < winCombinations.length; i++) {
    //Get the first win combination array
    const condition = winCombinations[i];
    // console.log(condition);
    // console.log(selectedCells);
    //Get the value from selected cells array
    //based on win combination index
    const cellA = selectedCells[condition[0]];
    const cellB = selectedCells[condition[1]];
    const cellC = selectedCells[condition[2]];
    // console.log(selectedCells);

    //Check if any of the cell value
    //in given index combination is empty
    //if yes then continue with next iteration
    if (cellA == "" || cellB == "" || cellC == "") {
      //   console.log("One of the cell is empty");
      continue;
    }
    // console.log(`cellA value: ${cellA} `);
    // console.log(`cellB value: ${cellB} `);
    // console.log(`cellC value: ${cellC} `);

    //Check if all the cells contain same value
    //If yes then update the roundwon to true and break
    if (cellA === cellB && cellB === cellC) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    statusText.textContent = `${currentPlayer} won`;
    // continueGame = false;
    alert(`${currentPlayer} won`);
    restartGame();
  } else if (!selectedCells.includes("")) {
    statusText.textContent = "Its a Draw";
    alert("Its a Draw!");
    restartGame();
    // continueGame = false;
  } else {
    //   if (currentPlayer == "x") {
    //       currentPlayer = "O";
    //   } else {
    //       currentPlayer = "X";
    //   }
    currentPlayer = currentPlayer == "X" ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
  }
}

function restartGame() {
  //   continueGame = true;
  selectedCells.fill("", 0, 9);
  currentPlayer = "X";
  statusText.textContent = `${currentPlayer}'s turn`;
  cells.forEach((cell) => (cell.textContent = ""));
}
initGame();
