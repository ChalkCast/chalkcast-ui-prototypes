let winTop = window.scrollY;
let docHeight = document.body.scrollHeight;
let winHeight = window.innerHeight;
let initialScroll = Math.floor((winHeight/docHeight)*100);
document.getElementById('main-progressbar').style.height = initialScroll+'%';

document.addEventListener('scroll', function(e) {
  winTop = window.scrollY;
  totalScroll = Math.floor(((winTop + winHeight)/docHeight)*100);
  document.getElementById('main-progressbar').style.height = totalScroll+'%';
});