var vid = document.getElementById("bgvid");
var pauseButton = document.querySelector("#inf button");

    if (window.matchMedia('(prefers-reduced-motion)').matches) {
        vid.removeAttribute("autoplay");
        vid.pause();
        pauseButton.innerHTML = "Pausado";
    }

    function vidFade() {
        
      vid.classList.add("stopfade");
        
    }

    vid.addEventListener('ended', function() {
        vid.pause();
        vidFade();
    }); 


    pauseButton.addEventListener("click", function() {
      vid.classList.toggle("stopfade");
      if (vid.paused) {
        vid.play();
        pauseButton.innerHTML = "Pausa";
      } else {
        vid.pause();
        pauseButton.innerHTML = "Pausado";
      }
    })

/*audio*/
var holding = false;
var track = document.getElementById('track');
var progress = document.getElementById('progress');
var play = document.getElementById('play');
var next = document.getElementById('next');
var prev = document.getElementById('prev');
var title = document.getElementById('title');
var artist = document.getElementById('artist');
var art = document.getElementById('art');
var current_track = 0;
var song, audio, duration;
var playing = false;
var songs = [{
    title: 'For Whom The Bell Tolls',
    artist: 'Metallica',
    url: 'https://audio.vibbidi-vid.com/vibbidi-us/audio/audio_D94218508FE643F4BBB0378D8FDBE4F4.mp3',
    art: 'https://i.pinimg.com/originals/07/1f/5b/071f5b9c7244f8ba4efbec1fb4ad2f75.png'
},
    
{
    title: 'Stole The Show',
    artist: 'Kygo ft. Parson James',
    url: 'https://mariongrandvincent.github.io/HTML-Personal-website/img-codePen/kygo-stole-the-show.mp3',
    art: 'https://www.dhresource.com/0x0/f2/albu/g8/M00/76/0D/rBVaV12r7cyAQ4eEAAKpLoLjJi0925.jpg'
},

{
    title: 'Sad But True',
    artist: 'Metallica',
    url: 'https://berserker2.vibbidi-vid.com/vibbidi-us/videos/faststart_video_265CE4A880544205BA47CAECB45EECF3.mp4',
    art: 'https://1.bp.blogspot.com/-2374SSm9_-Q/XFYHFmTd-RI/AAAAAAAAARM/lMhZA75_NhAa3oqyBsRmDqXKR3y9Bjk-ACEwYBhgL/s1600/folder5.jpg'
}];

window.addEventListener('load', init(), false);

function init() {
    song = songs[current_track];
    audio = new Audio();
    audio.src = song.url;
    title.textContent = song.title;
    artist.textContent = song.artist;
    art.src = song.art;
}


audio.addEventListener('timeupdate', updateTrack, false);
audio.addEventListener('loadedmetadata', function () {
    duration = this.duration;
}, false);
window.onmousemove = function (e) {
    e.preventDefault();
    if (holding) seekTrack(e);
}
window.onmouseup = function (e) {
    holding = false;
    console.log(holding);
}
track.onmousedown = function (e) {
    holding = true;
    seekTrack(e);
    console.log(holding);
}
play.onclick = function () {
    playing ? audio.pause() : audio.play();
}
audio.addEventListener("pause", function () {
    play.innerHTML = '<img class="pad" src="http://abarcarodriguez.com/lab/play.png" />';
    playing = false;
}, false);

audio.addEventListener("playing", function () {
    play.innerHTML = '<img src="http://abarcarodriguez.com/lab/pause.png" />';
    playing = true;
}, false);
next.addEventListener("click", nextTrack, false);
prev.addEventListener("click", prevTrack, false);


function updateTrack() {
    curtime = audio.currentTime;
    percent = Math.round((curtime * 100) / duration);
    progress.style.width = percent + '%';
    handler.style.left = percent + '%';
}

function seekTrack(e) {
    event = e || window.event;
    var x = e.pageX - player.offsetLeft - track.offsetLeft;
    percent = Math.round((x * 100) / track.offsetWidth);
    if (percent > 100) percent = 100;
    if (percent < 0) percent = 0;
    progress.style.width = percent + '%';
    handler.style.left = percent + '%';
    audio.play();
    audio.currentTime = (percent * duration) / 100
}
function nextTrack() {
    current_track++;
    current_track = current_track % (songs.length);
    song = songs[current_track];
    audio.src = song.url;
    audio.onloadeddata = function() {
      updateInfo();
    }
}

function prevTrack() {
    current_track--;
    current_track = (current_track == -1 ? (songs.length - 1) : current_track);
    song = songs[current_track];
    audio.src = song.url;
    audio.onloadeddata = function() {
      updateInfo();
    }
}

function updateInfo() {
    title.textContent = song.title;
    artist.textContent = song.artist;
    art.src = song.art;
    art.onload = function() {
        audio.play();
    }
}

/* canvas */

