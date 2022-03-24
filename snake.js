let grid = document.querySelector(".grid");
let popup = document.querySelector(".popup");
let retry = document.querySelector(".retry");
let scoreDisplay = document.querySelector(".ScoreDisplay");
let  left = document.querySelector(".left");
let  right = document.querySelector(".right");
let  up = document.querySelector(".up");
let  down = document.querySelector(".down");

let game_width = 10;
let curr_index = 0;
let apple_index = 0;
let current_snake = [2, 1, 0];
let direction = 1;
let score_value = 0;
let speed = .7;
let interval_timer = 100;
let interval = 0;

document.addEventListener("DOMContentLoaded", function() {
    document.addEventListener("keyup", control);
    document.addEventListener('keydown', keyDownHandler, false);
    createBoard();
    startGame();
    retry.addEventListener("click", replay);
});
// this doesn't want to work either
// and i'm not sure why
function keyDownHandler (event) {
    if (event.keycode == 37)  {
        direction = -1;
    }
    else if (event.keycode == 38) {
        direction = -10;
    }
    else if (event.keycode == 39) {
        direction = 1;
    }
    else if (event.keycode == 40) {
        direction = 10;
    }
}
window.addEventListener("keydown", function(event) {
    if (event.defaultPrevented) {
      return; // Do nothing if event already handled
    }
  
    switch(event.code) {
      case "KeyS":
      case "ArrowDown":
        direction = 10;
        break;
      case "KeyW":
      case "ArrowUp":
        direction = -10;
        break;
      case "KeyA":
      case "ArrowLeft":
        // Handle "turn left"
        direction = -1;
        break;
      case "KeyD":
      case "ArrowRight":
        // Handle "turn right"
        direction = 1;
        break;
    }
    event.preventDefault();
}, true);
function createBoard() {
popup.style.display = "none";
for (let i = 0; i < 100; i++) {
    let div = document.createElement("div");
    grid.appendChild(div);
}
}
function startGame(){
    let squares = document.querySelectorAll(".grid div");
    randomApple(squares);
    direction = 1;
    scoreDisplay.innerHTML = score_value;
    current_snake = [2, 1, 0];
    curr_index = 0;
    interval_timer = 700;
    current_snake.forEach(function(index) {
        squares[index].classList.add("snake");
    });
    //interval = setInterval(moveOutCome(), interval_timer);
    moveOutCome();
}
function moveOutCome() {
    console.log("in moveOoutcome");
    clearInterval(interval);
    let squares = document.querySelectorAll(".grid div");
    if (collisionCheck(squares) == false) {
        alert("You ran into something");
        popup.style.display = "flex";
        clearInterval(interval);
        return;
        //return clearInterval(interval);
    } else {
        updateSnake(squares);
    }
}
function updateSnake(squares) {
    let tail = current_snake.pop();
    squares[tail].classList.remove("snake");
    current_snake.unshift(current_snake[0] + direction);
    consumeApple(squares, tail);
    squares[current_snake[0]].classList.add("snake");
}
function collisionCheck(squares) {
    if (direction == 1) {//right
        if(current_snake[0] % 10 == 9)
            return false;
    }
    else if (direction == -1) {//left
        if (current_snake[0] % 10 == 0)
            return false;
    }
    else if (direction == 10) {//down
        if (current_snake[0] >= 90)
            return false;
    }
    else if (direction == -10) {//up
        if(current_snake[0] <= 9)
            return false;
    }
    if (squares[current_snake[0] + direction].classList.contains("snake"))
        return false;
    return true;
}
function randomApple(squares) {
    let appleIndex = Math.floor(Math.random() * 100);
    while(squares[appleIndex].classList.contains(".snake"));
        appleIndex = Math.floor(Math.random() * 100);
    squares[appleIndex].classList.add("apple");
}
function consumeApple(squares, tail) {
    if (squares[current_snake[0]].classList.contains("apple")) {
        squares[current_snake[0]].classList.remove("apple");
        squares[tail].classList.add("snake");
        current_snake.push(tail);
        randomApple(squares);
        score_value += 100;
        scoreDisplay.textContent = score_value;
        interval_timer = interval_timer * .8;
        if (interval_timer <= 400)
            interval_timer = 400;
    }
    //interval logic;
    clearInterval(interval);
    // update interval time;
    interval_timer = interval_timer; // decided not to increase game speed
    // update interval;
    interval = setInterval(moveOutCome, interval_timer);
}
function replay() {
    grid.innerHTML ="";
    createBoard();
    startGame();
    popup.style.display = "none";
}
function control(keypress) {
    if (keypress.keycode === 37) { // left arrow
        direction = -1;
    } else if (keypress.keycode === 38) { // up arrow
        direction = -10;
    } else if (keypress.keycode === 39) { // right arrow
        direction = 1;
    } else if (keypress.keycode == 40) { // down arrow
        direction = 10;
    }
}

up.addEventListener("click", function() { direction = -10;});
down.addEventListener("click", function() { direction = 10;});
right.addEventListener("click", function() { direction = 1;});
left.addEventListener("click", function() { direction = -1;});

/* I'm not sure why this doesn'y work
document.onkeydown = function(event) {
    switch(event.keycode) {
        case 37: direction = -1;
        case 38: direction = -10;
        case 39: direction = 1;
        case 40: direction = 10;
    }
}
*/