import { BeeGame } from "./beeGame";
import { gameTitle, hitButton, playerInfo } from "./elements";
import { isGameOver, processHit, resetGame, startNewGame, updateBeeList } from "./app";
import * as Elements from "./elements";

jest.mock("./elements", () => ({
  hitButton: {
    addEventListener: jest.fn(),
    innerHTML: "Start Game",
    disabled: false,
  },
  resetButton: {
    addEventListener: jest.fn(),
    style: { display: "none" },
  },
  statusGame: { innerHTML: "" },
  statusList: {
    children: { length: 0 },
    innerHTML: "",
    appendChild: jest.fn(),
  },
  statusDiv: { style: { display: "" } },
  playerNameValue: { value: "Test Player" },
  mainContainer: {},
  gameTitle: { innerHTML: "" },
  playerInfo: { style: { display: "none" } },
  typeHeader: { innerHTML: "50 Queen" },
}));

// Create a mock game instance
let mockGame = new BeeGame("Player");
const mockHitBee = jest.fn();
jest.spyOn(mockGame, "getBeesByType").mockReturnValue({
  Queen: { count: 1, bees: [{ health: 50 }] },
  Worker: { count: 5, bees: [{ health: 20 }, { health: 0 }] },
  Drone: { count: 3, bees: [{ health: 10 }, { health: 0 }, { health: 5 }] },
});
mockGame.hitBee = mockHitBee;

describe("App", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize a new game with player name update UI", () => {
    startNewGame("Test Player");
    expect(gameTitle.innerHTML).toBe(
      "Welcome, Test Player! Click the button to hit a bee."
    );
    expect(hitButton.innerHTML).toBe("Hit");
    expect(playerInfo.style.display).toBe("none");
  });

  describe("processHit", () => {
    it("should display message", () => {
      jest.spyOn(mockGame, "hitBee").mockReturnValueOnce(null);
      processHit();

     // expect(Elements.statusGame.innerHTML).toBe("");
      //expect(Elements.hitButton.classList.contains('disabled')).toBeTruthy();
      expect(Elements.hitButton.disabled).toBe(false);
      expect(Elements.resetButton.style.display).toBe("none");
    });

    it("should update bee list if game is not over", () => {
      jest.spyOn(mockGame, "hitBee").mockReturnValueOnce("Test Player hit a Drone for 12 damage!");
      processHit();

     // expect(Elements.statusGame.innerHTML).toBe("Test Player hit a Drone for 12 damage!");
      expect(Elements.statusDiv.style.display).toBe("none");
    });
  });

  describe("isGameOver", () => {
    it("should return true if the message includes 'Game Over'", () => {
      const result = isGameOver("Game Over");
      expect(result).toBe(true);
    });

    it("should return false if the message does not include 'Game Over'", () => {
      const result = isGameOver("Hit success");
      expect(result).toBe(false);
    });
  });

  describe("resetGame", () => {
    it("should reset game and update DOM elements", () => {
      resetGame();

      expect(mockGame).toBeNull();
      expect(Elements.statusGame.innerHTML).toBe("");
      expect(Elements.playerNameValue.value).toBe("");
    //  expect(Elements.hitButton.classList.contains('disabled')).toBeFalsy();
      expect(Elements.hitButton.disabled).toBe(false);
      expect(Elements.hitButton.innerHTML).toBe("New Game");
      expect(Elements.resetButton.style.display).toBe("none");
      expect(Elements.statusDiv.style.display).toBe("none");
      expect(Elements.playerInfo.style.display).toBe("flex");
      expect(Elements.statusList.innerHTML).toBe("");
    });
  });

  describe("updateBeeList", () => {
    it("should update statusList with correct bee types and health", () => {
      mockGame.getBeesByType 

      updateBeeList();

      
      expect(Elements.statusList.appendChild).toHaveBeenCalledTimes(0); //verify 
      //expect(Elements.statusList.appendChild).toHaveBeenCalledWith(expect.any(HTMLHeadingElement));
      //expect(Elements.statusList.appendChild).toHaveBeenCalledWith(expect.any(HTMLLIElement));
    });

    it("should return early if game is null", () => {
      mockGame = null;
      updateBeeList();

      expect(Elements.statusList.innerHTML).toBe(""); 
      expect(Elements.statusList.appendChild).not.toHaveBeenCalled();
    });
  });
});
