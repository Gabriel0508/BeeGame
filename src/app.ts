import "./styles.css";
import { BeeGame } from "./beeGame";
import * as Elements from "./elements";

let game: BeeGame;

Elements.hitButton.addEventListener("click", handleHitButtonClick);
Elements.resetButton.addEventListener("click", resetGame);

function handleHitButtonClick() {
  const playerName = Elements.playerNameValue.value || "Player";

  if (!game) {
    startNewGame(playerName);
  } else {
    processHit();
  }
}

export function startNewGame(playerName: string) {
  game = new BeeGame(playerName);
  Elements.playerInfo.style.display = "none";
  Elements.gameTitle.innerHTML = `Welcome, ${playerName}! Click the button to hit a bee.`;
  Elements.hitButton.innerHTML = "Hit";
}

function processHit() {
  const resultMessage = game.hitBee();
  Elements.statusGame.innerHTML = resultMessage;

  if (isGameOver(resultMessage)) {
    Elements.hitButton.classList.add("disabled");
    Elements.hitButton.disabled = true;
    Elements.resetButton.style.display = "block";
  } else {
    updateAliveBees();
  }

  if (Elements.statusList.children.length > 0) {
    Elements.statusDiv.style.display = "block";
  } else {
    Elements.statusDiv.style.display = "none";
  }
}

function isGameOver(resultMessage: string) {
  return resultMessage.includes("Game Over");
}

function updateAliveBees() {
  const aliveBees = game.getAliveBees();
  updateBeeList(aliveBees);
}

function resetGame() {
  game = null;
  Elements.statusGame.innerHTML = "";
  Elements.playerNameValue.value = "";
  Elements.hitButton.classList.remove("disabled");
  Elements.hitButton.disabled = false;
  Elements.hitButton.innerHTML = "New Game";
  Elements.resetButton.style.display = "none";
  Elements.statusDiv.style.display = "none";
  Elements.playerInfo.style.display = "flex";
  updateBeeList([]);
}

function updateBeeList(aliveBees: { type: string; health: number }[]) {
  Elements.statusList.innerHTML = "";
  aliveBees.forEach((bee) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${bee.type} : ${bee.health} HP`;
    Elements.statusList.appendChild(listItem);
  });
}
