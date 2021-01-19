
//Get parameter from URL
const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const qrUrl= urlParams.get('qrUrl')
console.log(qrUrl);


const app = document.getElementById('root');

//const logo = document.createElement('img');
//logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

//Quitar comentario si quiero poner logo
//app.appendChild(logo);
app.appendChild(container);



//API call
const urlrequest = 'http://localhost:8000/qr-api/?qrUrl='+ qrUrl;
var request = new XMLHttpRequest();
request.open('GET', urlrequest, true);
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  console.log(data[0])
  if (request.status >= 200 && request.status < 400) {

    if (data[0].cntType=='audio'){
        //Create audio element (this will go into an switch or similar)
        var sound      = document.createElement('audio');
        sound.id       = 'audio-player';
        sound.controls = 'controls';
        sound.src      = 'media/audiotest.mp3';
        sound.type     = 'audio/mpeg';
        //sound.autoplay = true; it doesnt work for some reason
        app.appendChild(sound);

    }

    if (data[0].cntType=='video'){
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

    }


  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
}

request.send();