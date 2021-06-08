//Initialize DOM elements we'll manipulate
let chalkboard = document.getElementById('chalkboard');
//let toggleBG = document.getElementById('toggleBackground');
let toolbar = document.getElementById('toolbar');
let mainColor = document.getElementById('mainColor');

//Global variables / tools
let sketch = [];
let path;
let chalk;
let eraser;
let strokeColor = 'white';
let strokeSize = 2;
let chalkActivated = 0;

//Initialization of PaperJS and attaching to canvas
paper.install(window);
//window.onload = function() {
function initializePaper() { 
// Create an empty project and a view for the canvas
    paper.setup(chalkboard);
    //Activate chalk by default
    chalkActivated = 1;

    //Chalk tool
    chalk = new Tool();
    chalk.onMouseDown = function(event) {
        path = new paper.Path();
        path.strokeColor = strokeColor;
        path.strokeWidth = strokeSize;
        path.add(event.point);
    }
    chalk.onMouseDrag = function(event) {
        path.add(event.point);
    }
    chalk.onMouseUp = function(event) {
        path.smooth();
        if (strokeColor === 'white' || strokeColor === 'black') {
            sketch.push(path);
        }
    }

    //Eraser tool
    eraser = new paper.Tool();
    eraser.onMouseDown = erase;
    eraser.onMouseDrag = erase;
    function erase(event) {
        //dataChanged = true;
        let hits = paper.project.hitTestAll(event.point, {
            segments: true,
            fill: true,
            class: paper.Path,
            tolerance: 5,
            stroke: true
        });

        if (hits.length) {
            for (var i = 0; i < hits.length; i++) {
                let hit = hits[i];
                hit.item.remove();            
            }
        }
    }

    chalk.activate();
}


//Main functions

//Toggle background from chalkboard to whiteboard and vice-versa
function toggleBackground() {
    if (chalkboard.className === "chalkboard") {
        chalkboard.className = "whiteboard";
        toggleBG.textContent = "Switch to Chalkboard";
        mainColor.style.backgroundColor = "#000000";
        toggleStrokeColors('black');
    }
    else {
        chalkboard.className = "chalkboard";
        toggleBG.textContent = "Switch to Whiteboard";
        mainColor.style.backgroundColor = "#ffffff";
        toggleStrokeColors('white');
    }
}

//Ensure black and white sketches also invert
function toggleStrokeColors(color) {
    for (let i = 0; i < sketch.length; i++) {
        //Only change for black or white strokes
            sketch[i].strokeColor = color;
            strokeColor = color;
    }
}

//Change colors
function changeColor(color) {
    //Reset active classes
    for (let i = 0; i < toolbar.children.length; i++) {
        toolbar.children[i].className = "";
    }

    //Activate drawing tool
    chalk.activate();

    //Change color
    document.getElementById(color).className = "active";
    if (color === 'mainColor') {
        if (chalkboard.className === "chalkboard") {
            strokeColor = 'white';
        }
        else {
            strokeColor = 'black';
        }
    }
    else if (color === 'red') {
        strokeColor = '#df5959'; 
    }
    else if (color === 'blue') {
        strokeColor = '#678fe0'; 
    }
    else if (color === 'green') {
        strokeColor = '#86d0ca'; 
    }
    else if (color === 'purple') {
        strokeColor = '#9e7ad9'; 
    }
    else if (color === 'orange') {
        strokeColor = '#d69e54'; 
    }
}

function toggleEraser() {
    //Reset active classes
    for (let i = 0; i < toolbar.children.length; i++) {
        toolbar.children[i].className = "";
    }
    document.getElementById('eraser').className = "active";
    eraser.activate();
}