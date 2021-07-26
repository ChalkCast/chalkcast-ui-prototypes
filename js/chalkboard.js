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
        if (chalkboard.classList.contains('chalkboard')) {
            strokeColor = 'white';
            document.getElementById('chalkboard').style.cursor = "url('./images/icons/sketchCursor.svg') 0 32, pointer";
        }
        else {
            strokeColor = 'black';
            document.getElementById('chalkboard').style.cursor = "url('./images/icons/sketchCursor.svg') 0 32, pointer";
        }
    }
    else if (color === 'red') {
        strokeColor = '#df5959'; 
        document.getElementById('chalkboard').style.cursor = "url('./images/icons/sketchCursorRed.svg') 0 32, pointer";
    }
    else if (color === 'blue') {
        strokeColor = '#678fe0'; 
        document.getElementById('chalkboard').style.cursor = "url('./images/icons/sketchCursorBlue.svg') 0 32, pointer";
    }
    else if (color === 'green') {
        strokeColor = '#86d0ca';
        document.getElementById('chalkboard').style.cursor = "url('./images/icons/sketchCursorGreen.svg') 0 32, pointer"; 
    }
    else if (color === 'purple') {
        strokeColor = '#9e7ad9'; 
        document.getElementById('chalkboard').style.cursor = "url('./images/icons/sketchCursorPurple.svg') 0 32, pointer";
    }
    else if (color === 'orange') {
        strokeColor = '#d69e54'; 
        document.getElementById('chalkboard').style.cursor = "url('./images/icons/sketchCursorOrange.svg') 0 32, pointer";
    }
}

function toggleEraser() {
    //Reset active classes
    for (let i = 0; i < toolbar.children.length; i++) {
        toolbar.children[i].className = "";
    }
    document.getElementById('eraser').className = "active";
    document.getElementById('chalkboard').style.cursor = "url('./images/icons/sketchCursorEraser.svg') 0 32, pointer";
    eraser.activate();
}

function changeTemplate() {
    template = document.getElementById("templateSelect").value;
    document.getElementById('chalkboard').className = 'chalkboard '+template; 
}

function toggleTemplate(template) {
    //Reset templates
    if (document.getElementById(template).className === 'active') {
        document.getElementById('chalkboard').className = 'chalkboard';
        document.getElementById(template).className = '';
    }
    else {
        let templates = ['gridSmall','gridLarge','dotsSmall','dotsLarge', 'lines','worldMap','usMap', 'sheetMusic','tabGuitar'];
        for (let i = 0; i < templates.length; i++) {
            document.getElementById(templates[i]).className = '';
        }
        
        document.getElementById('chalkboard').className = 'chalkboard '+template;
        document.getElementById(template).classList.toggle('active');
    }
}

function toggleTemplateMenu() {
    document.getElementById('templateMenu').classList.toggle('active');
}

function toggleTemplateCategory(category) {
    let categories = ['Math', 'Language', 'Geography', 'Music'];
    for (let i = 0; i < categories.length; i++) {
        document.getElementById(categories[i]+'Category').className = '';
        document.getElementById(categories[i]).style.display = 'none';
    }
    
    document.getElementById(category+'Category').className = 'active' 
    document.getElementById(category).style.display = 'block';
}