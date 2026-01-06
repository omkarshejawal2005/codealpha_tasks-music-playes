const songs = [
    { title: "Finding Her", artist: "Tanishka Bahl", src: "Finding Her (Female Version) _ Tanishka Bahl  Kushagra  Bharath  Saaheal  UR Debut.mp3" },
    { title: "Dooron Dooron", artist: "Paresh Pahuja", src: "Paresh Pahuja - Dooron Dooron (Live from The Voice Notes Concert).mp3" }
];

let currentSong = 0;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const volume = document.getElementById("volume");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const playlist = document.getElementById("playlist");
const playIcon = document.getElementById("play-icon");
const stopIcon = document.getElementById("stop-icon");

loadSong(currentSong);
createPlaylist();

function loadSong(index) {
    title.innerText = songs[index].title;
    artist.innerText = songs[index].artist;
    audio.src = songs[index].src;
    audio.load();
    durationEl.innerText = "0:00";
    progress.style.width = "0%";
    updatePlaylistActive();
}

function playPause() {
    if (audio.paused) {
        audio.play();
        playIcon.style.display = "none";
        stopIcon.style.display = "inline";
    } else {
        audio.pause();
        audio.currentTime = 0;
        playIcon.style.display = "inline";
        stopIcon.style.display = "none";
    }
}

function nextSong() {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    playPause();
}

function prevSong() {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    playPause();
}

audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        progress.style.width = percent + "%";
        currentTimeEl.innerText = formatTime(audio.currentTime);
        durationEl.innerText = formatTime(audio.duration);
    }
});

function formatTime(time) {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return min + ":" + sec.toString().padStart(2, "0");
}

progressContainer.addEventListener("click", (e) => {
    const rect = progressContainer.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    if (audio.duration) {
        audio.currentTime = percent * audio.duration;
    }
});

volume.addEventListener("input", () => audio.volume = volume.value);

function createPlaylist() {
    playlist.innerHTML = "";
    songs.forEach((song, index) => {
        const li = document.createElement("li");
        li.innerText = song.title + " - " + song.artist;
        li.onclick = () => {
            currentSong = index;
            loadSong(currentSong);
            playPause();
        };
        playlist.appendChild(li);
    });
}

function updatePlaylistActive() {
    const items = playlist.querySelectorAll("li");
    items.forEach((item, index) => {
        item.classList.toggle("active", index === currentSong);
    });
}

