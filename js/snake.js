let canvas = document.getElementById('snakeCanvas');
let canvasHeight = 0;
let canvasWidth = 0;
let tileSize = 24;

let snakeHead;
let snakeBody = [];
let apples = [];

let previousDir = 'Right';
let direction = 'Right';
let directionVar = 'Right';

let gameActive;
let gameSpeed = '70';

//Initialization of PaperJS and attaching to canvas
paper.install(window);

window.onload = (event) => {
    initializePaper();
};

//window.onload = function() {
function initializePaper() { 
    paper.setup(canvas);
    canvasHeight = paper.view.size.height;
    canvasWidth = paper.view.size.width; 
    
    startGame();
}

//EventListener to check which arrow key is pressed
window.addEventListener("keydown", pressedKey);

//Initializes snake
function startGame() {
    gameActive;

    let point = new Point(tileSize*10, tileSize*10);
    snakeHead = new Path.Circle(point, tileSize/2);
    snakeHead.fillColor = '#ffffff';

    generateRandomApples(10);


    gameActive = setInterval(function(){ 
        moveSnake(); 
    }, gameSpeed);
}

function generateRandomApples(num) {
    for (let i = 0; i < num; i++) {
        let randomX = tileSize * Math.floor(Math.random()*Math.floor(canvasWidth / tileSize));
        let randomY = tileSize * Math.floor(Math.random()*Math.floor(canvasHeight / tileSize));
        console.log(randomX, randomY);
        let point = new Point(randomX, randomY);
        let apple = new Path.Circle(point, tileSize/2);
        apple.fillColor = '#35B1A6';
        apple.shadowColor = '#35B1A6';
        apple.shadowBlur = 16;
        apples.push(apple);
    }
}

function moveSnake() {
    let prevPosition = snakeHead.position;

    switch (direction) {
        case "Up":
            snakeHead.position.y -= tileSize;
            break;
        case "Down":
            snakeHead.position.y += tileSize;
            break;
        case "Left":
            snakeHead.position.x -= tileSize;
            break;
        case "Right":
            snakeHead.position.x += tileSize;
            break;   
    }

    //Move rest of snake body
    if (snakeBody.length > 0) {
        for (let i = 0; i < snakeBody.length; i++) {
            let tempPosition = snakeBody[i].position;
            snakeBody[i].position = prevPosition;
            prevPosition = tempPosition;
            snakeBody[i].fillColor = '#ffffff';
        }
    }

    checkCollision();
}

function checkCollision() {

    //Did it hit an apple?
    for (let i = 0; i < apples.length; i++) {
        if (snakeHead.position.x === apples[i].position.x && snakeHead.position.y === apples[i].position.y) {
            apples[i].remove();
            apples.splice(i,1);
            generateRandomApples(1);

            //Add to snake length;
            let point;
            if (snakeBody.length > 0) {
                point = new Point(snakeBody[snakeBody.length-1].position.x - tileSize, snakeBody[snakeBody.length-1].position.y - tileSize);
            }
            else {
                point = new Point(snakeHead.position.x - tileSize, snakeHead.position.y - tileSize);
            }
            let segmentSize = (tileSize / 2) - (snakeBody.length*0.5);
            if (segmentSize < 4) {
                segmentSize = 4;
            }
            let newSnakeBody = new Path.Circle(point, segmentSize);
            snakeBody.push(newSnakeBody);
        }
    }

    //Did it hit itself? 
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeHead.position.x === snakeBody[i].position.x && snakeHead.position.y === snakeBody[i].position.y) {
            gameOver();
        }
    }

    //Is it past the wall?
    if (snakeHead.position.x < 0 || snakeHead.position.y < 0 || snakeHead.position.x > canvasWidth || snakeHead.position.y > canvasHeight) {
        gameOver();
    }
}

function gameOver() {
    clearInterval(gameActive);
            
    snakeHead.fillColor = '#af2323';
    for (let i = 0; i < snakeBody.length; i++) {
        snakeBody[i].fillColor = '#af2323';
    }
}

function pressedKey() {
    if(event.keyCode === 32 && gameStarted) {
        if(playing) {
            pauseGame();
        }
        else{
            resumeGame();
        }
    }
    else {
        previousDir = direction;
        directionVar = event.key.replace("Arrow", "");
        changeDirection();
    }
}

//change the direction of snake based on arrow key pressed
function changeDirection() {
    switch (directionVar) {
        case "Up":
            //move "up" only when previous direction is not "down"
            if (previousDir !== "Down") {
                direction=directionVar;
                // xSpeed = 0;
                // ySpeed = scale * -speed;
            } 
            break;

        case "Down":
            //move "down" only when previous direction is not "up"
            if (previousDir !== "Up") {
                direction=directionVar;
                // xSpeed = 0;
                // ySpeed = scale * speed;
            } 
            break;

        case "Left":
            //move "left" only when previous direction is not "right"
            if (previousDir !== "Right") {
                direction=directionVar;
                // xSpeed = scale * -speed;
                // ySpeed = 0;
            } 
            break;

        case "Right":
            //move "right" only when previous direction is not "left"
            if (previousDir !== "Left") {
                direction=directionVar;
                // xSpeed = scale * speed;
                // ySpeed = 0;
            } 
            break;
    }
}

