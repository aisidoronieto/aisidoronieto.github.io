const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const idURL= urlParams.get('id')
console.log(idURL);

const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);

//Create audio element (this will go into an switch or similar)
var sound      = document.createElement('audio');
sound.id       = 'audio-player';
sound.controls = 'controls';
sound.src      = 'media/audiotest.mp3';
sound.type     = 'audio/mpeg';
app.appendChild(sound);

//Create video player

var video = document.createElement("video");

if (video.canPlayType("video/mp4")) {
    video.setAttribute("src","media/videotest.mp4");
} else {
    video.setAttribute("src","movie.ogg");
}

video.setAttribute("width", "320");
video.setAttribute("height", "240");
video.setAttribute("controls", "controls");
app.appendChild(video);

//API call
const urlrequest = 'http://localhost:8000/heroes/'+ idURL;
var request = new XMLHttpRequest();
request.open('GET', urlrequest, true);
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  console.log(data)
  if (request.status >= 200 && request.status < 400) {

      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const h1 = document.createElement('h1');
      h1.textContent = `id: ${data.id}`;

      const p = document.createElement('p');
      data.name = data.name.substring(0, 300);
      p.textContent = `Type: ${data.name}`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);



  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
}

request.send();