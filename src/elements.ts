export const hitButton = document.getElementById(
  "hitButton"
) as HTMLButtonElement;
export const resetButton = document.getElementById(
  "resetButton"
) as HTMLButtonElement;
export const statusGame = document.getElementById("status") as HTMLDivElement;
export const playerNameValue = document.getElementById(
  "playerName"
) as HTMLInputElement;
export const mainContainer = document.querySelector(
  ".container"
) as HTMLDivElement;
export const gameTitle = document.getElementById(
  "gameTitle"
) as HTMLHeadElement;
export const playerInfo = document.querySelector(
  ".player-info"
) as HTMLDivElement;

/**
 * Create container for the Bee status
 */
export const statusDiv = document.createElement("div");
export const statusTitle = document.createElement("h2");
export const statusList = document.createElement("ul");

statusDiv.id = "statusContainer";
statusDiv.classList.add("bee-status");
statusList.id = "beeList";
statusTitle.textContent = "Bee Status";

statusDiv.appendChild(statusTitle);
statusDiv.appendChild(statusList);
mainContainer.appendChild(statusDiv);
