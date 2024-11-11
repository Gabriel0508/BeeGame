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

export function processHit() {
  const resultMessage = game.hitBee();
  Elements.statusGame.innerHTML = resultMessage;

  if (isGameOver(resultMessage)) {
    Elements.hitButton.classList.add("disabled");
    Elements.hitButton.disabled = true;
    Elements.resetButton.style.display = "block";
  } else {
    updateBeeList();
  }

  if (Elements.statusList.children.length > 0) {
    Elements.statusDiv.style.display = "block";
  } else {
    Elements.statusDiv.style.display = "none";
  }
}

export function isGameOver(resultMessage: string) {
  return resultMessage.includes("Game Over");
}

export function resetGame() {
  game = null;
  Elements.statusGame.innerHTML = "";
  Elements.playerNameValue.value = "";
  Elements.hitButton.classList.remove("disabled");
  Elements.hitButton.disabled = false;
  Elements.hitButton.innerHTML = "New Game";
  Elements.resetButton.style.display = "none";
  Elements.statusDiv.style.display = "none";
  Elements.playerInfo.style.display = "flex";
  updateBeeList();
}

export function updateBeeList() {
  Elements.statusList.innerHTML = "";
  if(!game) {
    return
  }
  const beesByType = game.getBeesByType();
  for (const [type, { count, bees }] of Object.entries(beesByType)) {
    const typeHeader = document.createElement("h3");
    typeHeader.style.color = "#6b4701";
    typeHeader.textContent = `${type}s (${count})`;
    Elements.statusList.appendChild(typeHeader);

    bees.forEach((bee) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${type} : ${bee.health} HP`;
      Elements.statusList.appendChild(listItem);
    });
  }
}
