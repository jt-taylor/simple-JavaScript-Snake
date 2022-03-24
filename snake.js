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
let interval_timer = 0;
let interval = 0;

document.addEventListener("DOMContentLoaded", function() {
    document.addEventListener("keyup", control);
    createBoard();
    startGame();
    //retry.addEventListener("click", replay);
});

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
    current_snake.forEach(function(index) {
        squares[index].classList.add("snake");
    });
    //  interval = setInterval(moveOutCome(), inteval_timer);
}
function moveOutCome() {
    let squares = document.querySelectorAll(".grid div");
    if (collisionCheck(squares) == false) {
        alert("You ran into something");
        popup.style.display = "flex";
        return //resetInterval(interval);
    } else {
        updateSnake(squares);
    }
}
function updateSnake(squares) {
    let tail = current_snake.pop();
    squares[tail].classList.remove("snake");
    current_snake.unshift(current_snake[0] + direction);
    //check eat apple(squares, tail);
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
        //interval logic;
        //. reset interval;
        // update interval time;
        // update interval;
    }
}
function control(keypress) {
    if (keypress.keycode === 37) { // left arrow
        direction = -1;
    } else if (keypress.keycode === 38) { // up arrow
        direction = -10;
    } else if (keypress.keycode === 39) { // right arrow
        direction = 1;
    } else if (keypress.keycode === 40) { // down arrow
        direction = 10;
    }
}

