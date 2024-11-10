import { BeeGame } from "./beeGame";
import { gameTitle, hitButton, playerInfo } from "./elements";
import { startNewGame } from './app';

jest.mock("./elements", () => ({
  hitButton: {
    innerHTML: "Start Game",
    disabled: false,
  },
  resetButton: { style: { display: "none" } },
  statusGame: { innerHTML: "" },
  playerNameValue: { value: "Test Player" },
  mainContainer: {},
  gameTitle: { innerHTML: "" },
  playerInfo: { style: { display: "none" } },
}));

// jest.mock('./app', () => {
//     handleHitButtonClick: jest.fn();
//     startNewGame: jest.fn();
// })

describe("App", () => {
   let game: BeeGame;

   beforeEach(() => {
    game = new BeeGame('Test Player');
   })

  it("should initialize a new game with player name update UI", () => {
    startNewGame("Test Player");
    expect(gameTitle.innerHTML).toBe(
      "Welcome, Test Player! Click the button to hit a bee."
    );
    expect(hitButton.innerHTML).toBe("Hit");
    expect(playerInfo.style.display).toBe("none");
  });
});
