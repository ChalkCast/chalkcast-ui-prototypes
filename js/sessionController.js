let expandedTile = "";
let yourStreamExpanded = 0;

let studentList = [
    'Angelica Gomez',
    'Billy Hamilton',
    'Cassidy Brown',
    'Devin Jackson',
    'Ellen Morris',
    'Ivania Harrison',
    'Jessica Bishop',
    'Kelly Blanco',
    'Larry Chan',
    'Mary Bishop',
    'Maria Lopez',
    'Ned Brown',
    'Olivia Martinez',
    'Paul Hammond',
    'Patricia Brown',
    'Rachel Potter',
    'Robert Adams',
    'Sarah Lively',
    'Tricia Lee',
    'Teresa Franklin',
    'Veronica Gomez',
    'Vicky White',
    'Vincent Hamilton',
    'Zach Jackson',
    'Zoe Martinez'
]

//Generate tiles on page load
window.onload = (event) => {
    let tileList = document.getElementById('tileList');

    for (i = 1; i < studentList.length + 1; i++) {
        let num = i.toString();

        let tile = document.createElement('li');
        tile.id = "tile"+num;
        tile.className = "tile";
        tile.onmouseover = function() {
            toggleNudge("nudgeTile"+num);
        }
        tile.onmouseout = function() {
            toggleNudge("nudgeTile"+num);
        }

        let tileImage = document.createElement('div');
        tileImage.className = "tileImage";
        tileImage.id = "tileImage"+num;
        tileImage.style.backgroundImage = "url('./images/people/"+i+".jpg')"; 
        //tileImage.style.backgroundImage = "url('./images/people/anonymous.jpg')";
        tileImage.onclick = function() {
            expand("tile"+num, "tileImage"+num);
        }
        tile.appendChild(tileImage);

        let nudgeTile = document.createElement('div');
        nudgeTile.className = "nudgeTile";
        nudgeTile.id = "nudgeTile"+num;

        let handTile = document.createElement('div');
        handTile.className = "handTile";
        handTile.id = "handTile"+num;
        handTile.onclick = function() {
            this.classList.toggle('active');
        }
        
        let name = document.createElement('div');
        name.className = "name";
        name.id = "name"+num;
        name.textContent = studentList[i-1];
        
        let videoToggle = document.createElement('div');
        videoToggle.className = "videoToggle"
        videoToggle.id = "video"+num;
        videoToggle.onclick = function() {
            toggleVideo(videoToggle.id, tileImage.id, name.id);
        }
        let audioToggle = document.createElement('div');
        audioToggle.className = "audioToggle"
        audioToggle.id = "audio"+num.toString();;
        audioToggle.onclick = function() {
            toggleAudio('audio'+num)
        }
        name.appendChild(videoToggle);
        name.appendChild(audioToggle);
        tile.appendChild(nudgeTile);
        tile.appendChild(handTile);
        tile.appendChild(name);
        tileList.appendChild(tile);

        let chatList = document.getElementById('chatList');       
        let chat = document.createElement('li');
        chat.className = "indicator-active";
        chat.textContent = studentList[i-1];
        let studentName = studentList[i-1];
        chat.onclick = function() {
            toggleThread(studentName);
        }
        chatList.appendChild(chat);
    }
    
    //Someone random raising their hand
    let random = Math.floor(Math.random()*9) + 2;
    document.getElementById('handTile'+random).classList.toggle('active');
};

//Toggle video on/off
function toggleVideo(tile, tileImage, name) {
    if (document.getElementById(tile).className === 'videoToggle') {
        document.getElementById(tile).className = 'videoToggle off';

        //Remove bg image
        document.getElementById(tileImage).style.display = "none";
        
        //Move name up and center
        document.getElementById(name).className = "name noVideo";
    }
    else {
        document.getElementById(tile).className = 'videoToggle';
        
        //Add bg image
        document.getElementById(tileImage).style.display = "block";
        
        //Move name down
        document.getElementById(name).className = "name";
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

//Expand tile
function expand(tile, tileImage) {
    if (document.getElementById(tile).className === 'tile') {
        //Reset any other tiles
        let ul = document.getElementById("tileList");
        let items = ul.getElementsByTagName("li");
        for (let i = 0; i < items.length; i++) {
            items[i].className = 'tile';
            items[i].firstChild.className = 'tileImage';
        }
        document.getElementById(tile).className = 'tile expanded';
        document.getElementById(tileImage).className = 'tileImage expanded';

        //Activate tile specific menu and arrows
        document.getElementById('tileToolbar').className = "active";
        document.getElementById('prevButton').className = "active";
        document.getElementById('nextButton').className = "active";

        //Update state of current tile
        expandedTile = parseInt(tile.substring(4),10);

        //Window
        window.scrollTo(0, 0);
    }
    else if (document.getElementById(tile).className === 'tile expanded') {
        document.getElementById(tile).className = 'tile';
        document.getElementById(tile).firstChild.className = 'tileImage';

        //Remove tile specific menu and arrows
        document.getElementById('tileToolbar').className = "";
        document.getElementById('prevButton').className = "";
        document.getElementById('nextButton').className = "";
    }
}

function expandYourStream() {
    if (!yourStreamExpanded) {
        yourStreamExpanded = 1;

        let tileList = document.getElementById("tileList");
        let tile = document.createElement('li');
        tile.id = "yourTile";
        tile.className = "tile";

        let tileImage = document.createElement('div');
        tileImage.className = "tileImage";
        tileImage.id = "yourTileImage";
        tileImage.style.backgroundImage = "url('./images/people/anonymous.jpg')"; 
        tileImage.onclick = function() {
            expandYourStream();
        }
        tile.appendChild(tileImage);

        let name = document.createElement('div');
        name.className = "name";
        name.id = "yourName"
        name.textContent = "My stream";

        let videoToggle = document.createElement('div');
        videoToggle.className = "videoToggle"
        videoToggle.id = "yourVideo";
        videoToggle.onclick = function() {
            toggleVideo(videoToggle.id, tileImage.id, name.id);
            toggleInformation('videoToggle');
        }
        let audioToggle = document.createElement('div');
        audioToggle.className = "audioToggle"
        audioToggle.id = "yourAudio";
        audioToggle.onclick = function() {
            toggleAudio("yourAudio");
            toggleInformation('audioToggle');
        }
        name.appendChild(videoToggle);
        name.appendChild(audioToggle);
        tile.appendChild(name);
        tileList.appendChild(tile);

        expand("yourTile");
    }
    else {
        yourStreamExpanded = 0;
        expand("yourTile");
        document.getElementById('yourTile').remove();
    }
}

function changeTile(tile) {
    //Reset any other tiles
    let ul = document.getElementById("tileList");
    let items = ul.getElementsByTagName("li");
    for (let i = 0; i < items.length; i++) {
        items[i].className = 'tile';
    }
    document.getElementById(tile).className = 'tile expanded';
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

function togglePanel(panel) {
    if (document.getElementById('panel').className === 'active') {
        document.getElementById('panel').className = '';
        document.getElementById('panel-'+panel).style.display = 'none';
        document.getElementById(panel).className = '';
        //Chat specific
        if (panel === 'chat') {
        document.getElementById('chatThread').className = '';
        }
    }
    else {
        document.getElementById('panel').className = 'active';
        document.getElementById('panel-'+panel).style.display = 'block';
        document.getElementById(panel).className = 'active';
    }
}

function toggleChalkboard() {
    if (document.getElementById('chalkboardContainer').className === 'active') {
        document.getElementById('chalkboardContainer').className = '';
        document.getElementById('chalk').className = '';
    }
    else {
        document.getElementById('chalkboardContainer').className = 'active';
        document.getElementById('chalk').className = 'active';
    if (!chalkActivated) {
        setTimeout( function() {
        initializePaper();
        }, 1000);      
    }
    }
}

function toggleThread(thread) {
    if (thread === 'exit') {
        document.getElementById('chatThread').className = '';
    }
    else {
        document.getElementById('chatThread').className = 'active';
        document.getElementById('threadName').textContent = thread;
    }
}    

function toggleRaisedHand() {
    if (document.getElementById('yourRaisedHand').className === 'active') {
        document.getElementById('yourRaisedHand').className = '';
    }
    else {
        document.getElementById('yourRaisedHand').className = 'active';
    }
}

function toggleNudge(nudgeDOM) {
    document.getElementById(nudgeDOM).classList.toggle('active');
}

document.addEventListener('keydown', logKey);

function logKey(e) {
  if (e.key === 'ArrowLeft') {
    prevScreen();
    
  }
  else if (e.key === 'ArrowRight') {
    nextScreen();
  }
}

function prevScreen() {
    expandedTile--;
    if (expandedTile === 0) {
        expandedTile = studentList.length;
    }
    changeTile('tile'+expandedTile.toString());
}

function nextScreen() {
    expandedTile++;
    if (expandedTile > studentList.length) {
        expandedTile = 1;
    }
    changeTile('tile'+expandedTile.toString());
}

function chatFilter() {
    
}