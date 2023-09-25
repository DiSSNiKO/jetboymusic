import { useRef, useState } from "react";
import { fadeOutDoStuffThenFadeInLoadable } from "../utility.js";

function MusicPlayer(props) {
    const [lastVolume, setLastVolume] = useState(1);
    const { pauseBtn, picturePaths, musicImgSrcChanger, musik, setPreviousSong, setSongs, seekerfill, lastSongIndex, handleSeeker, audioRef, isPlaying, setIsPlaying, handlePause, currentSong, setCurrentSong, songs } = props;
    const handleSeekerChange = (e) => {
        const seekerPercentage = Math.round((e.nativeEvent.offsetX / Number(window.getComputedStyle(e.target.closest(".seeker")).width.slice(0, -2))) * 100);
        audioRef.current.currentTime = Math.round(seekerPercentage * (audioRef.current.duration / 100));
        handleSeeker();
    }
    const handleVolumeChange = (e) => {
        const eTarget = e.target;
        if (eTarget.classList.contains('vol-icon')) {
            if (audioRef.current.volume === 0) {
                audioRef.current.volume = lastVolume;
                volumefill.current.style.width = (audioRef.current.volume * 100).toString() + '%';
            } else {
                setLastVolume(audioRef.current.volume);
                audioRef.current.volume = 0;
                volumefill.current.style.width = '0%';
            }
        } else {
            const offset = e.nativeEvent.offsetX;
            const maxWidth = Number(window.getComputedStyle(e.target.closest(".seeker")).width.slice(0, -2));
            let part = Math.floor((offset / maxWidth) * 100);
            if (part >= 95) {
                part = 1;
            } else if (part > 5 && part <= 10) {
                part = Number("0.0" + part.toString());
            } else if (part <= 5) {
                part = 0;
            } else {
                part = part / 100;
            }
            audioRef.current.volume = part;
            volumefill.current.style.width = `${part * 100}%`;
        }
    }
    const handleGoLeft = () => {
        if (currentSong > 0) {
            const updatedSongs = songs;
            updatedSongs[currentSong].played++;
            setSongs(updatedSongs);
            setPreviousSong(currentSong);
            setCurrentSong(currentSong - 1);
        } else {
            const updatedSongs = songs;
            updatedSongs[currentSong].played++;
            setSongs(updatedSongs);
            setPreviousSong(currentSong);
            setCurrentSong(lastSongIndex);
        }
    }
    const handleGoRight = () => {
        if (currentSong < lastSongIndex) {
            const updatedSongs = songs;
            updatedSongs[currentSong].played++;
            setSongs(updatedSongs);
            setPreviousSong(currentSong);
            setCurrentSong(currentSong + 1);
        } else {
            const updatedSongs = songs;
            updatedSongs[currentSong].played++;
            setSongs(updatedSongs);
            setPreviousSong(currentSong);
            setCurrentSong(0);
        }
    }
    const volumefill = useRef(null);
    const leftSong = useRef(null);
    return (
        <div className="music-player-cont">
            <img src="/images/musig.jpg" ref={musik} className="music-pic"/>
            <div className="music-controls">
                <div className="seeker" onClick={handleSeekerChange}>
                    <div className="seeker-fill" ref={seekerfill} ></div>
                </div>
                <div className="seeker volume-level" onClick={(e) => {
                    handleVolumeChange(e);
                }}>
                    <img src="/images/vol.svg" alt="" className="vol-icon" />
                    <div className="seeker-fill ogo" ref={volumefill}></div>
                </div>
                <div className="c-buttons" >
                    <img id="prev-song" src="/images/goleft.svg" ref={leftSong} onClick={()=>{
                        fadeOutDoStuffThenFadeInLoadable(musik.current, handleGoLeft, musicImgSrcChanger, picturePaths);
                    }} />
                    <img src={!isPlaying ? "/images/continue.svg" : "/images/pause.svg"} id="play-pause" ref={pauseBtn} onClick={handlePause}/>
                    <img id="next-song" src="/images/goright.svg" onClick={()=>{
                        fadeOutDoStuffThenFadeInLoadable(musik.current, handleGoRight, musicImgSrcChanger, picturePaths);
                    }} />
                </div>
                <div id="song-name">{songs[currentSong]["name"]}</div>
            </div>
        </div>
    );
}

export default MusicPlayer;
