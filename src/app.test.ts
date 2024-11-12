import {
  handleHitButtonClick,
  isGameOver,
  processHit,
  resetGame,
  startNewGame,
  updateBeeList,
} from "./app";
import { BeeGame } from "./beeGame";
import * as Elements from "./elements";

jest.mock("./elements", () => ({
  hitButton: document.createElement("button"),
  resetButton: document.createElement("button"),
  statusGame: document.createElement("div"),
  playerNameValue: document.createElement("input"),
  mainContainer: document.createElement("div"),
  gameTitle: document.createElement("div"),
  playerInfo: document.createElement("div"),
  statusDiv: document.createElement("div"),
  statusTitle: document.createElement("h2"),
  statusList: document.createElement("ul"),
}));

jest.mock("../src/beeGame");

describe("App functions", () => {
  let game: jest.Mocked<BeeGame>;

  beforeEach(() => {
    game = new BeeGame("Player") as jest.Mocked<BeeGame>;
    Elements.hitButton.innerHTML = "Hit";
    Elements.resetButton.style.display = "none";
    Elements.statusDiv.appendChild(Elements.statusTitle);
    Elements.statusDiv.appendChild(Elements.statusList);
    Elements.mainContainer.appendChild(Elements.statusDiv);

    game = {
      hitBee: jest.fn(),
      getBeesByType: jest.fn(),
    } as any;
  });

  it("should initialize statusDiv correctly", () => {
    expect(Elements.statusDiv).toBeDefined();
    expect(Elements.mainContainer.contains(Elements.statusDiv)).toBe(true);
  });

  describe("startNewGame", () => {
    it("should initialize the game and update the UI", () => {
      startNewGame("Test Player");

      expect(Elements.playerInfo.style.display).toBe("none");
      expect(Elements.gameTitle.innerHTML).toContain("Welcome, Test Player!");
      expect(Elements.hitButton.innerHTML).toBe("Hit");
    });
  });

  describe("processHit", () => {
    it("should not update statusDiv if no bees are present", () => {
      game.hitBee.mockReturnValue("Test Player hit a Worker for 10 damage!");
      game.getBeesByType.mockReturnValue({
        Worker: { count: 0, bees: [] },
      });

      processHit();
      expect(Elements.statusDiv.style.display).toBe("none");
    });
  });

  describe("isGameOver function", () => {
    it("should return true if the result message includes 'Game Over'", () => {
      expect(isGameOver("Game Over! All bees are dead!")).toBe(true);
    });

    it("should return false if the result message does not include 'Game Over'", () => {
      expect(isGameOver("Test Player hit a Worker for 10 damage!")).toBe(false);
    });
  });

  describe("resetGame", () => {
    it("should reset game state and UI elements", () => {
      resetGame();

      expect(Elements.statusGame.innerHTML).toBe("");
      expect(Elements.playerNameValue.value).toBe("");
      expect(Elements.hitButton.classList.contains("disabled")).toBe(false);
      expect(Elements.hitButton.disabled).toBe(false);
      expect(Elements.hitButton.innerHTML).toBe("New Game");
      expect(Elements.resetButton.style.display).toBe("none");
      expect(Elements.statusDiv.style.display).toBe("none");
      expect(Elements.playerInfo.style.display).toBe("flex");
      expect(Elements.statusList.innerHTML).toBe("");
    });
  });

  describe("updateBeeList", () => {
    it("should not update list if game is null", () => {
      game = null as unknown as jest.Mocked<BeeGame>;
      updateBeeList();

      expect(Elements.statusList.innerHTML).toBe("");
    });
  });

  describe("handleHitButtonClick", () => {
    it("should start a new game if game is null", () => {
      game = null;
      handleHitButtonClick();

      // Check that BeeGame constructor is called to create a new game
      expect(BeeGame).toHaveBeenCalledWith(expect.any(String)); // Ensures a player name was provided
      expect(Elements.gameTitle.innerHTML).toContain("Welcome");
      expect(Elements.hitButton.innerHTML).toBe("Hit");
    });
  });
});
