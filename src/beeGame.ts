import { Queen } from "../src/queen";
import { Worker } from "../src/worker";
import { Drone } from "../src/drone";

export class BeeGame {
  private bees: (Queen | Worker | Drone)[];
  private playerName: string;

  constructor(playerName: string) {
    this.bees = [];
    this.playerName = playerName;
    this.initializeBees();
  }

  public hitBee(): string {
    const aliveBees = this.bees.filter((bee) => bee.health > 0);

    if (aliveBees.length === 0) {
      return "Game Over";
    }

    const randomIndex = Math.floor(Math.random() * aliveBees.length);
    const bee = aliveBees[randomIndex];

    let damage: number;
    if (bee instanceof Queen) {
      damage = 8;
    } else if (bee instanceof Worker) {
      damage = 10;
    } else {
      damage = 12;
    }

    // Apply damage and ensure health does not go below zero
    bee.health = Math.max(0, bee.health - damage);
    const gameOverMessage = this.checkIfGameOver();
    if (gameOverMessage) {
      return gameOverMessage;
    }

    return `${this.playerName} hit a ${bee.constructor.name} for ${damage} damage!`;
  }

  public getAliveBees() {
    return this.bees.map((bee) => ({
      type: bee.constructor.name,
      health: bee.health,
    }));
  }

  public getBeesByType() {
    return this.bees.reduce((acc, bee) => {
      const type = bee.constructor.name;
      if (!acc[type]) {
        acc[type] = { count: 0, bees: [] };
      }
      if (bee.health > 0) {
        acc[type].count += 1;
      }
      acc[type].bees.push({ health: bee.health });
      return acc;
    }, {} as Record<string, { count: number; bees: { health: number }[] }>);
  }

  private initializeBees() {
    this.bees.push(new Queen());

    for (let i = 0; i < 5; i++) {
      this.bees.push(new Worker());
    }

    for (let i = 0; i < 8; i++) {
      this.bees.push(new Drone());
    }
  }

  private checkIfGameOver(): string | null {
    if (this.bees[0] instanceof Queen && this.bees[0].health <= 0) {
      this.bees = [];
      return "Game Over! The Queen has died! All bees are dead!";
    }

    if (this.bees.every((bee) => bee.health <= 0)) {
      return "Game Over! All bees are dead!";
    }

    return null;
  }
}
