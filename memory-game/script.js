const board = document.getElementById("gameBoard");

let cardsArray = ["A","A","B","B","C","C","D","D"];
let firstCard = null;
let secondCard = null;
let lockBoard = false;

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function createBoard() {
  board.innerHTML = "";
  let shuffled = shuffle(cardsArray);

  shuffled.forEach((value) => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = value;
    card.innerHTML = "";

    card.addEventListener("click", flipCard);

    board.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard || this === firstCard) return;

  this.classList.add("flipped");
  this.innerHTML = this.dataset.value;

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkMatch();
}

function checkMatch() {
  let isMatch = firstCard.dataset.value === secondCard.dataset.value;

  if (isMatch) {
    firstCard = null;
    secondCard = null;
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");

      firstCard.innerHTML = "";
      secondCard.innerHTML = "";

      firstCard = null;
      secondCard = null;
      lockBoard = false;
    }, 1000);
  }
}

function restartGame() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  createBoard();
}

createBoard();