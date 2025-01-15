const prompt = require("prompt-sync")();

// Defining classes
class Player {
  constructor(type) {
    this.type = type;   // for human or computer players
    this.choice = null; // for rock or paper or scissors
    this.points = 0     // to track the points
  }
  play() {
    this.choice = prompt("Make your choice (scissors, paper or rock): ").toLowerCase();
    if(this.choice === "rock" || this.choice === "scissors" || this.choice === "paper") {
      console.log(`The ${this.type} goes with ${this.choice}`)
    }
    else {
      console.log("Incorrect spelling. Try again.")
      this.play()
    }
    
  }
}

class humanPlayer extends Player {
  constructor() {
    super("human");
  }
}

class computerPlayer extends Player {
  constructor() {
    super("computer");
  }

  play() {
    const rps = ["rock", "paper", "scissors"];
    this.choice = rps[Math.floor(Math.random() * 3)];
    console.log(`The ${this.type} goes with ${this.choice}`);
  }
}

class Game {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.result = null;
  }
  winner() {
    if (this.player1.choice === this.player2.choice) {
      this.result = `It's a draw! The ${this.player1.type} has ${this.player1.points} points, the ${this.player2.type} has ${this.player2.points} points.`;
      console.log(this.result);
    } else if (
      (this.player1.choice === "paper" && this.player2.choice === "rock") ||
      (this.player1.choice === "rock" && this.player2.choice === "scissors") ||
      (this.player1.choice === "scissors" && this.player2.choice === "paper")
      ) {
        this.player1.points++;
        this.result = `The ${this.player1.type} is a winner! The ${this.player1.type} has ${this.player1.points} points, the ${this.player2.type} has ${this.player2.points} points.`;
        console.log(this.result);
    } else {
        this.player2.points++
        this.result = `The ${this.player2.type} is a winner! The ${this.player1.type} has ${this.player1.points} points, the ${this.player2.type} has ${this.player2.points} points.`;
        console.log(this.result);
    }

    //Deciding if the player wants to continue
    const playAgain = prompt("Do you want to play again? Type 'y' if yes.").toLowerCase()
    if(playAgain === 'y') {
        const newChoice = prompt("Play again, make your choice: ").toLowerCase();
        this.player1.choice = newChoice;
        console.log(`Now the human goes with ${newChoice}`);
        this.player2.play(); // the computer plays
        this.winner();
    }
    else {
        console.log("See you later!!!")
    }
    
  }
}

const human = new humanPlayer();
human.play();
const computer = new computerPlayer();
computer.play();

const testGame = new Game(human, computer);
testGame.winner();

