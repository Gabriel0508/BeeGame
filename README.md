Game project: 
I used webpack for this project
1: run npm install - to install the modules
2: npm start - to start the game

**Requirements**
The Bee game

The story
A bee swarm has the following members:
• Queen – 1 bee
• Worker – 5 bees
• Drone – 8 bees
At the beginning of the game, all bees are healthy (Health Points below):
• Queen – 100HP
• Worker (each) – 75HP
• Drone (each) – 50HP

Game-play
The UI should have a “Hit” button. When clicked, you must pick a random swarm member (Queen,
Worker or Drone) and do the following damage to it: queen – 8 damage, worker – 10 damage, drone – 12 damage
When a bee remains without HP, it dies. When the Queen remains without HPs, all swarm members die.
The game user interface must be clear, concise, intuitive and its main elements are:
• “Hit” button
• The player name
• Alive bees: grouped by type (BONUS: show detailed info about the swarm’s health)
• Which bee type is hit at each click and the damage done

End game
• When there are no bees alive+
• When the Queen remains without HP
• The game should be able to re-initialize with the default parameters after “game over”
• The game state should be persisted between different browser sessions

Rules
• You must build this game from scratch using ES6/TypeScript, HTML5 and CSS3
• Don’t use thirds party libraries to develop the game’s functionalities
• The code should be covered by unit tests
• Make sure your application is decoupled, and the code is reusable and scalable. For
  example, can a new bee type easily be added to the hive?
• There’s no time limit, take your time for the best approach you can think of
