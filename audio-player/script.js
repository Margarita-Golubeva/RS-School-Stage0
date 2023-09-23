document.addEventListener('DOMContentLoaded', function () {
    
    const audio = document.getElementById('myAudio');
    const videoClip = document.getElementById('videoClip');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressBar = document.getElementById('progressBar');
    const currentTime = document.getElementById('currentTime');
    const duration = document.getElementById('duration');

    let currentSong = 0;
    const songs = ["song1.mp3", "song2.mp3", "song3.mp3", "song4.mp3", "song5.mp3", "song6.mp3"];
    const videoClips = ["video1.mp4", "video2.mp4", "video3.mp4", "video4.mp4", "video5.mp4", "video6.mp4"];
    const titles = ["Unknown (To You)", "Dream On", "Who Can You Trust", "Enemy", "Better", "Venom"];
    const artists = ["Jacob Banks", "Blacktop Mojo", "Ivy Levan", "Imagine Dragons", "Plumb", "Eminem"];

    // play/pause button
    playPauseBtn.addEventListener('click', function () {
        if (audio.paused) {
            audio.play();
            videoClip.play();
            playPauseBtn.innerText = 'Pause';
        } else {
            audio.pause();
            videoClip.pause();
            playPauseBtn.innerText = 'Play';
        }
    });

    // previous button
    prevBtn.addEventListener('click', function () {
        currentSong = (currentSong - 1 + songs.length) % songs.length;
        updateMedia();
    });

    // next button
    nextBtn.addEventListener('click', function () {
        currentSong = (currentSong + 1) % songs.length;
        updateMedia();
    });

    // update media (audio and video)
    function updateMedia() {
        audio.src = songs[currentSong];
        videoClip.src = videoClips[currentSong];
        audio.play();
        videoClip.play();
        playPauseBtn.innerText = 'Pause';
        document.querySelector('.song-details h2').innerText = titles[currentSong];
        document.querySelector('.song-details p').innerText = artists[currentSong];
        videoClip.poster = `cover${currentSong + 1}.jpg`;
    }

    // update current time and progress bar
    audio.addEventListener('timeupdate', function () {
        currentTime.innerText = formatTime(audio.currentTime);
        progressBar.value = (audio.currentTime / audio.duration) * 100;
    });

    // update duration when audio is loaded
    audio.addEventListener('loadedmetadata', function () {
        duration.innerText = formatTime(audio.duration);
    });

    window.onload = function () {
        const audio = document.getElementById("myAudio");
        const video = document.getElementById("videoClip");
        const progressBar = document.getElementById("progressBar");
    
        // progress bar change
        progressBar.addEventListener("input", function () {
            const seekTime = (audio.duration / 100) * progressBar.value;
            audio.currentTime = seekTime;
            video.currentTime = seekTime;
        });
    
        // update the video time as the audio plays
        audio.addEventListener("timeupdate", function () {
            video.currentTime = audio.currentTime;
        });
    };

    // time format
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    // play next song when the current song ends
    audio.addEventListener('ended', function () {
        currentSong = (currentSong + 1) % songs.length;
        updateMedia();
    });

    // initialize the media with the first song
    updateMedia();

});
