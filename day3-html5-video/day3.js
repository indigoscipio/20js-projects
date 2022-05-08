let btnPlay = document.querySelector(".play");
let btnStop = document.querySelector(".stop");
let video = document.querySelector("#video");
let progress = document.querySelector("#progress");
let timestamp = document.querySelector("#timestamp");
let controls = document.querySelector(".controls");

video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", updateVideoProgress);
btnPlay.addEventListener("click", toggleVideoStatus);
btnStop.addEventListener("click", stopVideo);
progress.addEventListener("change", setVideoProgress);

//play & pause the video
function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

//update play icon
function updatePlayIcon() {
  if (video.paused) {
    btnPlay.innerHTML = `<i class="fa-solid fa-2xl fa-play"></i>`;
  } else {
    btnPlay.innerHTML = `<i class="fa-solid fa-2xl fa-pause"></i>`;
  }
}

//update timestamp
function updateVideoProgress() {
  progress.value = (video.currentTime / video.duration) * 100;
  console.log(progress.value);

  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = "0" + String(mins);
  }

  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) {
    secs = "0" + String(secs);
  }

  timestamp.innerHTML = `${mins}:${secs}`;
}

//video progress
function setVideoProgress() {
  video.currentTime = (+progress.value * video.duration) / 100;
}

//stop video
function stopVideo() {
  video.pause();
  video.currentTime = 0;
}
