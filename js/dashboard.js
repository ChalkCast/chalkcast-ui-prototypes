const studentList = [
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
    'Grace Potter'
]

window.onload = (event) => {
    for (let i = 0; i < studentList.length; i++) {
        let guest = document.createElement('li');
        let guestImage = document.createElement('div');
        guestImage.className = 'guestImage';
        guestImage.style.backgroundImage = "url('./images/people/"+(i+1)+".jpg')";
        let guestName = document.createElement('div');
        guestName.className = 'guestName';
        guestName.textContent = studentList[i];
        guest.appendChild(guestImage);
        guest.appendChild(guestName);
        document.getElementById('guestModalList').appendChild(guest);
    }
}

const popSound = new Audio('./sounds/pop.mp3');

function addNewRoom() {
    let roomNav = document.getElementById('roomNav')
    let room = document.createElement('li');
    room.className = "roomCard";
    let roomName = document.createElement('h4');
    roomName.innerHTML = "Organic Chemistry";
    let roomLink = document.createElement('a');
    roomLink.href = "./dashboardRoom.html";
    let guestPreview = document.createElement('div');
    guestPreview.className = "guestPreview";
    guestPreview.onmouseenter = function() {
        toggleGuestModal();
    };
    guestPreview.onmouseleave = function() {
        toggleGuestModal();
    };
    let roomDetails = document.createElement('h5');
    roomDetails.innerHTML = "<strong>18</strong>"
    roomDetails.className = "roomDetails";

    // let lastSession = document.createElement('h5');
    // lastSession.innerHTML = "MONDAY";
    // lastSession.className = "lastSession";


    roomLink.appendChild(roomName);
    room.appendChild(roomLink);
    room.appendChild(guestPreview);
    room.appendChild(roomDetails);
    // room.appendChild(lastSession);
    roomNav.insertBefore(room, roomNav.children[1]);

    popSound.play();
}

function toggleProfileNav() {
    document.getElementById('profileMenu').classList.toggle('active');
}

function toggleGuestModal() {
    document.getElementById('guestModal').classList.toggle('active');
}