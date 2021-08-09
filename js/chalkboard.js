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

let initialX;
let initialY;
let finalX;
let finalY;

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

    line = new Tool();
    line.onMouseDown = function(event) {
        path = new paper.Path();
        path.strokeColor = strokeColor;
        path.strokeWidth = strokeSize;
        path.add(event.point);
        path.add(event.point);
    }
    line.onMouseDrag = function(event) {
        path.segments[1].point = event.point;
    }

    circle = new Tool();
    circle.onMouseDown = function(event) {
        path = new paper.Path();
        initialX = event.point.x;
        initialY = event.point.y;
    }
    circle.onMouseDrag = function(event) {
        path.remove();
        finalX = event.point.x;
        finalY = event.point.y;
        rect =  new paper.Rectangle(new Point(initialX, initialY), new Point(finalX, finalY));
        path = new paper.Path.Ellipse(rect);
        path.strokeColor = strokeColor;
        path.strokeWidth = strokeSize;
    }
    circle.onMouseUp = function(event) {
        finalX = event.point.x;
        finalY = event.point.y;
        rect =  new paper.Rectangle(new Point(initialX, initialY), new Point(finalX, finalY));
        path = new paper.Path.Ellipse(rect);
        path.strokeColor = strokeColor;
        path.strokeWidth = strokeSize;
    }

    square = new Tool();
    square.onMouseDown = function(event) {
        path = new paper.Path();
        initialX = event.point.x;
        initialY = event.point.y;
    }
    square.onMouseDrag = function(event) {
        path.remove();
        finalX = event.point.x;
        finalY = event.point.y;
        path =  new paper.Path.Rectangle(new Point(initialX, initialY), new Point(finalX, finalY));
        path.strokeColor = strokeColor;
        path.strokeWidth = strokeSize;
    }
    square.onMouseUp = function(event) {
        finalX = event.point.x;
        finalY = event.point.y;
        path = new paper.Path.Rectangle(new Point(initialX, initialY), new Point(finalX, finalY));
        path.strokeColor = strokeColor;
        path.strokeWidth = strokeSize;
    }

    //Text tool
    textInput = new Tool();
    textInput.onMouseUp = function(event) {
        let x = event.point.x - 20;
        let y = event.point.y - 20;
        let input = document.createElement("input");
        input.type = "text";
        input.className = "chalkboardText";
        input.style.top = y+"px";
        input.style.left = x+"px";
        input.style.color = strokeColor;
        document.getElementById('textContainer').appendChild(input);
        input.click();
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

//Clear canvas 
function clearChalkboard() {
    paper.project.activeLayer.removeChildren();
    document.getElementById('textContainer').innerHTML = "";
}

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

//Change tools
function changeTool(tool) {
    let tools = ['draw','line','square','circle','text','eraser'];
    for (let i = 0; i < tools.length; i++) {
        document.getElementById(tools[i]).className = "";
    }

    if (tool === 'text') {
        textInput.activate();
        document.getElementById('chalkboard').style.cursor = "url('./images/icons/text.svg') 0 32, pointer";
    }
    else if (tool === 'draw') {
        chalk.activate();
        document.getElementById('chalkboard').style.cursor = "url('./images/icons/sketchCursor.svg') 0 32, pointer";
    }
    else if (tool === 'line') {
        line.activate();
        document.getElementById('chalkboard').style.cursor = "url('./images/icons/sketchCursor.svg') 0 32, pointer";
    }
    else if (tool === 'square') {
        square.activate();
        document.getElementById('chalkboard').style.cursor = "url('./images/icons/sketchCursor.svg') 0 32, pointer";
    }
    else if (tool === 'circle') {
        circle.activate();
        document.getElementById('chalkboard').style.cursor = "url('./images/icons/sketchCursor.svg') 0 32, pointer";
    }
    else if (tool === 'eraser') {
        eraser.activate();
        document.getElementById('chalkboard').style.cursor = "url('./images/icons/sketchCursorEraser.svg') 0 32, pointer";
    }

    document.getElementById(tool).className = "active";
}

//Change colors
function changeColor(color) {
    //Reset active classes
    let colors = ['mainColor','red','blue','green','purple','orange'];
    for (let i = 0; i < colors.length; i++) {
        document.getElementById(colors[i]).className = "";
    }

    //Change color
    document.getElementById(color).className = "active";
    if (color === 'white') {
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