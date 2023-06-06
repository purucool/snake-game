// game const and variable
// console.log("welcome to snake game");
// let highscoreval;
let inputdir = { x: 0, y: 0 };
const foodsound = new Audio("success-1-6297.mp3");
const gameover = new Audio("game end.mp3");
const movesound = new Audio("snake eat.mp3");
const musicsound = new Audio("game.mp3");
let board = document.getElementById("board");
let speed = 5;
let lastPaintTime = 0;
let snakearr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };
let score = 0;
// game function
// gameloop
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}
function gameEngine() {
  // 1.update snake array
  // snake array= postion of the sanke at diff parts
  if (isCollide(snakearr)) {
    gameover.play();
    musicsound.pause();
    inputdir = { x: 0, y: 0 };
    alert("Game Over Press OK to Play Again");
    snakearr = [{ x: 13, y: 15 }];
    musicsound.play();
    score = 0;
    scorebox.innerHTML = "SCORE : " + score;
  }

  // if you have eatten the food inc score and put at different place
  if (snakearr[0].y === food.y && snakearr[0].x === food.x) {
    foodsound.play();
    score += 1;
    if (score > highscoreval) {
      highscoreval = score;
      localStorage.setItem("HIGHSCORE", JSON.stringify(highscoreval));
      highscore.innerHTML = "HIGHSCORE : " + highscoreval;
    }
    scorebox.innerHTML = "SCORE : " + score;
    snakearr.unshift({
      x: snakearr[0].x + inputdir.x,
      y: snakearr[0].y + inputdir.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }
  // moving the snake
  for (let i = snakearr.length - 2; i >= 0; i--) {
    snakearr[i + 1] = { ...snakearr[i] };
  }
  snakearr[0].x += inputdir.x;
  snakearr[0].y += inputdir.y;

  // 2.render/display the snake and food
  // display the snake
  board.innerHTML = "";
  snakearr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index == 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });
  //   display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

// collide
function isCollide(sarr) {
  // if you bump into itself
  for (let i = 1; i < snakearr.length; i++) {
    if (snakearr[i].x === snakearr[0].x && snakearr[i].y === snakearr[0].y) {
      return true;
    }
  }
  // if you bumb into wall
  if (
    snakearr[0].x >= 18 ||
    snakearr[0].x <= 0 ||
    snakearr[0].y >= 18 ||
    snakearr[0].y <= 0
  ) {
    return true;
  }
}

// function playmusic() {
//   musicsound.play();
// }
// main logic
musicsound.play();
// high score logic
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
  highscoreval = 0;
  localStorage.setItem("HIGHSCORE", JSON.stringify(highscoreval));
} else {
  highscoreval = JSON.parse(hiscore);
  highscore.innerHTML = "HIGHSCORE : " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputdir = { x: 0, y: 1 }; //start the game;
  movesound.play();
  switch (e.key) {
    case "ArrowUp":
      //   console.log("1");y
      inputdir.x = 0;
      inputdir.y = -1;
      break;
    case "ArrowDown":
      inputdir.x = 0;
      inputdir.y = 1;
      //   console.log("2");
      break;
    case "ArrowLeft":
      inputdir.x = -1;
      inputdir.y = 0;
      //   console.log("3");
      break;
    case "ArrowRight":
      inputdir.x = 1;
      inputdir.y = 0;
      //   console.log("4");
      break;
    default:
      break;
  }
});
