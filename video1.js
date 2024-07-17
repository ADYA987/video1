const video = document.getElementById("video");
const playpause = document.getElementById("play-pause");
const frwd = document.getElementById("skip-10");
const bkwrd = document.getElementById("skipminus-10");
const volume = document.getElementById("volume");
const mutebtn = document.getElementById("mute");
const videoContainer = document.querySelector(".video-container");
const controls = document.querySelector(".controls");
const progressBar = document.querySelector(".progress-bar");
const playbackline = document.querySelector(".playback-line");
const currentTimeRef = document.getElementById("current-time");
const maxDuration = document.getElementById("max-duration");
const playCountRef = document.getElementById("play-count"); // Add a reference to the play count element

let timeFormatter = (timeInput) => {
    let minute = Math.floor(timeInput / 60);
    minute = minute < 10 ? "0" + minute : minute;
    let second = Math.floor(timeInput % 60);
    second = second < 10 ? "0" + second : second;
    return `${minute}:${second}`;
};

let playCount = 0; // Initialize the play count variable

playpause.addEventListener("click", function() {
    if (video.paused) {
        video.play();
        playpause.innerHTML = '<i class="fa-solid fa-pause">';
        playCount++; // Increment the play count when the video starts playing
    } else {
        video.pause();
        playpause.innerHTML = '<i class="fa-solid fa-play">';
    }
    playCountRef.textContent = `Play Count: ${playCount}`; // Update the play count element
});

frwd.addEventListener("click", function() {
    video.currentTime += 10;
});

bkwrd.addEventListener("click", function() {
    video.currentTime -= 10;
});

mutebtn.addEventListener("click", function() {
    video.muted = !video.muted;
    if (video.muted) {
        mutebtn.innerHTML = '<i class="fa-solid fa-volume-mute">';
    } else {
        mutebtn.innerHTML = '<i class="fa-solid fa-volume-up">';
    }
});

volume.addEventListener("input", function() {
    video.volume = volume.value;
});

video.addEventListener("timeupdate", function() {
    let currentTime = video.currentTime;
    currentTimeRef.textContent = timeFormatter(currentTime);
    let maxDurationTime = video.duration;
    maxDuration.textContent = timeFormatter(maxDurationTime);
    let progressBarWidth = (currentTime / maxDurationTime) * 100;
    playbackline.style.width = `${progressBarWidth}%`;
});