let canvas = document.getElementById('snakeCanvas');
let canvasHeight = 0;
let canvasWidth = 0;
let tileSize = 24;

let snakeHead;
let snakeBody = [];
let startingApples;
let apples = [];

let previousDir = 'Right';
let direction = 'Right';
let directionVar = 'Right';

let gameActive;
let score;
let gameSpeed;

let appleSound = new Audio('./sounds/zap.wav');
let gameoverSound = new Audio('./sounds/gameover.wav');


//Initialization of PaperJS and attaching to canvas
paper.install(window);

window.onload = (event) => {
    document.getElementById('notification').classList.toggle('active');
    setTimeout( function() {
        document.getElementById('notification').classList.toggle('active');
    }, 3000);

    paper.setup(canvas);
    canvasHeight = paper.view.size.height;
    canvasWidth = paper.view.size.width; 
    startGame();
};

//EventListener to check which arrow key is pressed
window.addEventListener("keydown", pressedKey);

//Initializes snake
function startGame() {

    //Clear paper canvas
    paper.project.clear();
    //Reset score
    score = 0;
    if (document.getElementById('gameoverPanel').className === 'active') {
        document.getElementById('gameoverPanel').classList.toggle('active');
    }
    document.getElementById('score').innerHTML = "Score <strong class='score'>0</strong>";

    //Reset other variables
    gameActive;
    gameSpeed = '70';
    startingApples = 10;
    previousDir = 'Right';
    direction = 'Right';
    directionVar = 'Right';
    snakeHead;
    snakeBody = [];
    apples = [];
    clearInterval(gameActive);

    //Generate snake head
    let point = new Point(tileSize*10, tileSize*10);
    snakeHead = new Path.Circle(point, tileSize/2);
    snakeHead.fillColor = '#ffffff';

    //Generate apples
    generateRandomApples(startingApples);

    //Set pace of game
    gameActive = setInterval(function(){ 
        moveSnake(); 
    }, gameSpeed);
}

function generateRandomApples(num) {
    for (let i = 0; i < num; i++) {
        let randomX = tileSize * Math.floor(Math.random()*Math.floor(canvasWidth / tileSize)) + tileSize;
        let randomY = tileSize * Math.floor(Math.random()*Math.floor(canvasHeight / tileSize)) + tileSize;
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

            //Play audio
            appleSound.play();

            //Add to score
            incrementScore();
            
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

function incrementScore() {
    score++;
    document.getElementById('score').innerHTML = "Score <strong class='score'>"+score+"</strong>";
    if (score >= 10 && score < 20) {
        gameSpeed = 60;
        clearInterval(gameActive);
        gameActive = setInterval(function(){ 
            moveSnake(); 
        }, gameSpeed);
    }
    else if (score >= 20 && score < 30) {
        gameSpeed = 50;
        clearInterval(gameActive);
        gameActive = setInterval(function(){ 
            moveSnake(); 
        }, gameSpeed);
    }
    else if (score >= 30 && score < 40) {
        gameSpeed = 40;
        clearInterval(gameActive);
        gameActive = setInterval(function(){ 
            moveSnake(); 
        }, gameSpeed);
    }
    else if (score >= 40 && score < 50) {
        gameSpeed = 30;
        clearInterval(gameActive);
        gameActive = setInterval(function(){ 
            moveSnake(); 
        }, gameSpeed);
    }
    else if (score >= 50 && score < 60) {
        gameSpeed = 20;
        clearInterval(gameActive);
        gameActive = setInterval(function(){ 
            moveSnake(); 
        }, gameSpeed);
    }
}

function gameOver() {
    //Play audio
    gameoverSound.play();

    clearInterval(gameActive);
            
    snakeHead.fillColor = '#af2323';
    for (let i = 0; i < snakeBody.length; i++) {
        snakeBody[i].fillColor = '#af2323';
    }

    document.getElementById('gameoverPanel').classList.toggle('active');
    document.getElementById('gameoverScore').innerHTML = "Score <strong class='score'>"+score+"</strong></h3>"
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
            } 
            break;

        case "Down":
            //move "down" only when previous direction is not "up"
            if (previousDir !== "Up") {
                direction=directionVar;
            } 
            break;

        case "Left":
            //move "left" only when previous direction is not "right"
            if (previousDir !== "Right") {
                direction=directionVar;
            } 
            break;

        case "Right":
            //move "right" only when previous direction is not "left"
            if (previousDir !== "Left") {
                direction=directionVar;
            } 
            break;
    }
}

//Toggle audio on/off
function toggleAudio(tile) {
    if (document.getElementById(tile).className === 'audioToggle') {
        document.getElementById(tile).className = 'audioToggle off';
    }
    else {
        document.getElementById(tile).className = 'audioToggle';
    }
}

function togglePanel(panel) {
    document.getElementById('chatPanel').className = '';
    document.getElementById('settingsPanel').className = '';
    document.getElementById('chatThread').className = '';
    if (document.getElementById('panel').className === 'active') {
        document.getElementById('panel').className = '';
        document.getElementById(panel+'Panel').style.display = 'none';
        if (panel === 'chat') {
            document.getElementById('chatThread').className = '';
        }
    }
    else {
        document.getElementById('panel').className = 'active';
        document.getElementById(panel+'Panel').style.display = 'block';
    }
}

function toggleInformation(tool) {
    if (document.getElementById(tool).className === 'active') {
        document.getElementById(tool).className = '';
    }
    else {
        document.getElementById(tool).className = 'active';
    }

    //Turn off own video
    if (document.getElementById('videoToggle').className === 'active') {
        document.getElementById('yourStream').className = 'active';
    }
    else {
        document.getElementById('yourStream').className = '';
    }
}


