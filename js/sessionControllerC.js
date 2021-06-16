let expandedTile = "";
let yourStreamExpanded = 0;

let studentList = [
    'Angelica Gomez',
    'Billy Hamilton',
    'Rebecca Kingsley',
    'Devin Jackson',
    'Ivania Martinez',
    'Breanna Harrison',
    'Casey Bishop',
    'Kelly Blanco',
    'Tristan Lee',
    'Angie White',
    'Daniela Lopez',
    'Chad Brown',
    'Annie Martinez',
    'Brian Hammond',
    'Jessica Brown',
    'Grace Potter',
    'Robert Adams',
    'Blake Lively',
    'Veronica Lee',
    'Cathy Franklin'
]

//Generate tiles on page load
window.onload = (event) => {
    
    //Notification
    //toggleNotification();
    document.getElementById('notification').classList.toggle('active');

    let tileList = document.getElementById('tileList');

    for (i = 1; i < studentList.length + 1; i++) {
        let num = i.toString();
        let student = studentList[i-1];

        let tile = document.createElement('li');
        tile.id = "tile"+num;
        tile.className = "tile empty";

        tileList.appendChild(tile);

        let chatList = document.getElementById('chatList');       
        let chat = document.createElement('li');
        if (i < 16) {
            chat.className = "active";
        }
        else {
            chat.className = "inactive";
        }
        chat.textContent = studentList[i-1];
        let studentName = studentList[i-1];
        let newMessage = document.createElement('div');
        newMessage.className = 'newMessage';
        newMessage.id = 'newMessage'+num;
        chat.appendChild(newMessage);
        chatList.appendChild(chat);
    }

    //Someone random raising their hand
    let random = Math.floor(Math.random()*9) + 2;
    document.getElementById('handTile'+random).classList.toggle('active');

    //Someone random chatting
    for (let i = 0; i < 3; i++) {
        let random = Math.floor(Math.random()*9) + 2;
        document.getElementById('newMessage'+random).classList.toggle('active');
        document.getElementById('newMessage'+random).textContent = "1";
    }
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

function toggleNudgePanel(student) {
    document.getElementById('nudgePanel').classList.toggle('active');
    if (student) {
        document.getElementById('nudgeTitle').innerHTML = "Nudge <strong>"+student+"</strong>";
    }
};

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
function expand(tile) {
    if (document.getElementById(tile).className === 'tile') {
        //Activate expanded div
        document.getElementById('expandedTile').className = "active";
        document.getElementById('tileList').className = "expanded streamContainer";

        //Activate tile specific menu and arrows
        //document.getElementById('tileToolbar').className = "active";
        document.getElementById('prevButton').className = "active";
        document.getElementById('nextButton').className = "active";

        //Check and see another tile is already expanded
        if (document.getElementById('expandedTile').firstChild != null) {

            document.getElementById('expandedTile').firstChild.className = 'tile';
            
            let tileIndex = parseInt(document.getElementById('expandedTile').firstChild.id.substring(4),10);
            document.getElementById('tileList').insertBefore(document.getElementById('expandedTile').firstChild, document.getElementById('tileList').children[tileIndex-1]);
            //document.getElementById('tileList').appendChild(document.getElementById('expandedTile').firstChild);
        }

        //Put tile in other div
        document.getElementById('expandedTile').appendChild(document.getElementById(tile));
        document.getElementById(tile).className = 'tile expanded';

        document.getElementById(tile).firstChild.className = 'tileImage expanded';

        //Make other tiles full width
        let ul = document.getElementById("tileList");
        let items = ul.getElementsByTagName("li");
        for (let i = 0; i < items.length; i++) {
            items[i].style.width = '100%';
        }
        
        //Update state of current tile
        expandedTile = parseInt(tile.substring(4),10);

        //Updade tile toolbar
        document.getElementById('fullscreen'+expandedTile).className = 'fullscreen active';
        document.getElementById('nudgeTile'+expandedTile).className = 'nudgeTile expanded';

        //Window
        window.scrollTo(0, 0);
    }
    else if (document.getElementById(tile).className === 'tile expanded') {

        //Put back in tile list
        document.getElementById(tile).className = 'tile';

        let tileIndex = parseInt(document.getElementById('expandedTile').firstChild.id.substring(4),10);
        document.getElementById('tileList').insertBefore(document.getElementById('expandedTile').firstChild, document.getElementById('tileList').children[tileIndex-1]);
        
        //Dectivate expanded div
        document.getElementById('expandedTile').className = "";
        document.getElementById('tileList').className = "streamContainer";
        
        //Make other tiles normal width
        let ul = document.getElementById("tileList");
        let items = ul.getElementsByTagName("li");
        for (let i = 0; i < items.length; i++) {
            items[i].style.width = '';
        }

        //Updade tile toolbar
        document.getElementById('fullscreen'+expandedTile).className = 'fullscreen';
        document.getElementById('nudgeTile'+expandedTile).className = 'nudgeTile active';

        //Remove tile specific menu and arrows
        //document.getElementById('tileToolbar').className = "";
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
        tileImage.className = "tileImage expanded";
        tileImage.id = "yourTileImage";
        tileImage.style.backgroundImage = "url('./images/people/teacher.jpg')"; 
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

function toggleFullscreen() {
    if (document.getElementById('expandedTile').className === 'active') {
        document.getElementById('expandedTile').className = 'active fullscreen';
        //document.getElementById('tileToolbar').className = 'active fullscreen';
        document.getElementById('fullscreen'+expandedTile).className = 'fullscreen reduce';
        document.getElementById('nextButton').className = 'active expanded';
    }
    else {
        document.getElementById('expandedTile').className = 'active';
        //document.getElementById('tileToolbar').className = 'active';
        document.getElementById('fullscreen'+expandedTile).className = 'fullscreen active';
        document.getElementById('nextButton').className = 'active';
    }
}

function chatFilter(filter) {
    document.getElementById('allFilter').className = '';
    document.getElementById('questionsFilter').className = '';
    document.getElementById('linksFilter').className = '';
    document.getElementById(filter+'Filter').classList.toggle('active');
}

function toggleNotification(notification) {
    if (notification) {
        document.getElementById('notification').innerHTML = notification;
    }
    document.getElementById('notification').classList.toggle('active');
    setTimeout( function() {
        document.getElementById('notification').classList.toggle('active');
    }, 3000);
}

function toggleSwitch(id) {
    document.getElementById('switch'+id).classList.toggle('on');
}

function toggleRoomLock(state) {
    document.getElementById('unlockedRoom').className = '';  
    document.getElementById('lockedRoom').className = '';
    document.getElementById(state+'Room').className = 'active';
    if (state === 'unlocked') {
        document.getElementById('lockedCaption').innerHTML = "Anyone with the link can join";
    }
    else {
        document.getElementById('lockedCaption').innerHTML = "Guests must be approved to join";
    }
}

function toggleSmallPanel() {
    document.getElementById('smallPanel').classList.toggle('active');  
}