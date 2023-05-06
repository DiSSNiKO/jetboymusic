function MusicPlayer(props) {
    const { seekerfill, lastSongIndex, handleSeeker, audioRef, isPlaying, setIsPlaying, currentSong, setCurrentSong, songs } = props;
    const handlePause = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    }
    const handleSeekerChange = (e) => {
        const seekerPercentage = Math.round((e.nativeEvent.offsetX / Number(window.getComputedStyle(e.target.closest(".seeker")).width.slice(0, -2))) * 100);
        console.log(seekerPercentage);
        audioRef.current.currentTime = Math.round(seekerPercentage * (audioRef.current.duration / 100));
        handleSeeker();
    }
    const handleGoLeft = () => {
        if (currentSong > 0) {
            setCurrentSong(currentSong - 1);
        } else {
            setCurrentSong(lastSongIndex);
        }
    }
    const handleGoRight = () => {
        if (currentSong < lastSongIndex) {
            setCurrentSong(currentSong + 1);
        } else {
            setCurrentSong(0);
        }
    }
    return (
        <div className="music-player-cont">
            <img src="/images/musig.jpg" />
            <div className="music-controls">
                <div className="seeker" onClick={handleSeekerChange}>
                    <div className="seeker-fill" ref={seekerfill} ></div>
                </div>
                <div className="c-buttons">
                    <img id="prev-song" src="/images/goleft.svg" onClick={handleGoLeft} />
                    <img src={!isPlaying ? "/images/continue.svg" : "/images/pause.svg"} id="play-pause" onClick={handlePause} />
                    <img id="next-song" src="/images/goright.svg" onClick={handleGoRight} />
                </div>
                <div id="song-name">{songs[currentSong]["name"]}</div>
            </div>
        </div>
    );
}

export default MusicPlayer;
