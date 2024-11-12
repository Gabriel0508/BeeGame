import { Queen } from "../src/queen";
import { Worker } from "../src/worker";
import { Drone } from "../src/drone";
import { BeeGame } from "./beeGame";

jest.mock("../src/queen");
jest.mock("../src/worker");
jest.mock("../src/drone");

describe("BeeGame", () => {
    let game;
  beforeEach(() => {
    (Queen as jest.Mock).mockClear();
    (Worker as jest.Mock).mockClear();
    (Drone as jest.Mock).mockClear();
  });

  it("should initialize with the correct number of bees", () => {
    game = new BeeGame("Test Player");
    
    expect(Queen).toHaveBeenCalledTimes(1);
    expect(Worker).toHaveBeenCalledTimes(5);
    expect(Drone).toHaveBeenCalledTimes(8);
  });

  it("should show the alive bees", () => {
    game = new BeeGame("Test Player");

    const initialAliveBees = game.getAliveBees();
    expect(initialAliveBees.length).toBe(14);
  });

  it("should return 'Game Over' if no bees are alive", () => {
    game = new BeeGame("Test Player");

    game["bees"].forEach((bee) => bee.health === 0);

    expect(game.hitBee()).toBe("Game Over");
  });

  it("should hit a random alive bee and reduce its health", () => {
    game = new BeeGame("Test Player");

    const aliveBee = new Worker();
    aliveBee.health = 20;
    game["bees"] = [aliveBee];

    const result = game.hitBee();
    expect(result).toContain("Test Player hit a Worker for 10 damage");
    expect(aliveBee.health).toBeLessThan(20);
  });

  it("should show the alive bees", () => {
    game = new BeeGame("Test Player");

    const initialAliveBees = game.getAliveBees();
    expect(initialAliveBees.length).toBe(14);
  });

  it("should group bees by type with counts in getBeesByType", () => {
    game = new BeeGame("Test Player");

    game["bees"].forEach((bee) => (bee.health = 100));

    const beesByType = game.getBeesByType();

    expect(beesByType["Queen"].count).toBe(1);
    expect(beesByType["Worker"].count).toBe(5);
    expect(beesByType["Drone"].count).toBe(8);
  });

  it("should return game over message when the Queen dies", () => {
    game = new BeeGame("Test Player");

    const queen = game["bees"].find((bee) => bee instanceof Queen);
    if (queen) {
      queen.health === 0;
    }
    const result = game.hitBee();
    expect(result).toBe("Game Over");
  });
});
