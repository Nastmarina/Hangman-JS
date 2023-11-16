hangman.js
const StartButton = document.getElementById("start");
let hangmanState = -1;
let chosenWord;
const blank = document.getElementById("blank");
const drawHangman = (hangmanState) => {
  const canvas = document.getElementById("hangmanCanvas");
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.moveTo(20, 200);
  context.lineTo(20, 20);
  context.stroke();
  context.moveTo(20, 20);
  context.lineTo(100, 20);
  context.stroke();
  context.moveTo(100, 20);
  context.lineTo(100, 40);
  context.stroke();
  if (hangmanState >= 1) {
    context.beginPath();
    context.arc(100, 60, 20, 0, 2 * Math.PI);
    context.stroke();
    context.beginPath();
    context.arc(92, 55, 3, 0, 2 * Math.PI);
    context.fillStyle = "black";
    context.fill();
    context.beginPath();
    context.arc(108, 55, 2, 0, 2 * Math.PI);
    context.fillStyle = "black";
    context.fill();
    context.moveTo(87, 65);
    context.lineTo(115, 65);
    context.stroke();
    context.closePath();
  }
  if (hangmanState >= 2) {
    context.moveTo(100, 80);
    context.lineTo(100, 140);
    context.stroke();
  }
  if (hangmanState >= 3) {
    context.moveTo(100, 100);
    context.lineTo(60, 120);
    context.stroke();
  }
  if (hangmanState >= 4) {
    context.moveTo(100, 100);
    context.lineTo(140, 120);
    context.stroke();
  }
  if (hangmanState >= 5) {
    context.moveTo(100, 140);
    context.lineTo(80, 180);
    context.stroke();
  }
  if (hangmanState >= 6) {
    context.moveTo(100, 140);
    context.lineTo(120, 180);
    context.stroke();
  }
};
function word() {
  const words = ["король", "принцесса", "рыцарь", "дракон", "замок"];
  chosenWord = words[Math.floor(Math.random() * words.length)];
  return chosenWord;
}
function ChillBlank() {
  const chosenWord = word();
  blank.textContent = "_ ".repeat(chosenWord.length);
  StartButton.classList.add("display-none");
}
StartButton.addEventListener("click", ChillBlank);
document.addEventListener("DOMContentLoaded", function () {
  const alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
  const buttonsContainer = document.getElementById("buttons-container");
  alphabet.split("").forEach((letter) => {
    const button = document.createElement("button");
    button.className = "button";
    button.id = `letter-${letter}`;
    button.textContent = letter.toUpperCase();
    button.addEventListener("click", function () {
      handleLetterClick(letter);
    });
    buttonsContainer.appendChild(button);
  });
});
function handleLetterClick(letter) {
  let found = false;
  for (let i = 0; i < chosenWord.length; i++) {
    if (letter === chosenWord[i]) {
      found = true;
      const tmp = blank.textContent;
      blank.textContent = tmp.slice(0, i * 2) + letter + tmp.slice(i * 2 + 1);
    }
  }
  if (!found) {
    hangmanState++;
    drawHangman(hangmanState);
  }
}
