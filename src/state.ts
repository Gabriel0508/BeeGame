import { Queen } from "../src/queen";
import { Worker } from "../src/worker";
import { Drone } from "../src/drone";

//TODO: manage the game state
// export function saveGameState() {
//   const state = {
//     bees: this.bees.map((bee: Queen | Worker | Drone) => ({
//       type: bee.constructor.name,
//       health: bee.health,
//     })),
//     playerName: this.playerName,
//   };
//   localStorage.setItem("beeGameState", JSON.stringify(state));
// }

// export function loadGameState() {
//   const savedState = localStorage.getItem("beeGameState");
//   if (savedState) {
//     const state = JSON.parse(savedState);
//     this.playerName = state.playerName;
//     this.bees = state.bees.map((beeData: { type: string; health: number }) => {
//       if (beeData.type === "Queen") {
//         return new Queen().health;
//       }
//       if (beeData.type === "Worker") {
//         return new Worker().health;
//       }
//       return new Drone().health;
//     });
//     return this.bees;
//   }
//   return null;
// }

// export function clearGameState() {
//   localStorage.removeItem("beeGameState");
// }
