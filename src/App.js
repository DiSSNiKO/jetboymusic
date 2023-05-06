import { useEffect, useRef, useState } from 'react';
import './App.css';
import MusicPlayer from './components/MusicPlayer';
import SearchBar from './components/SearchBar';
import SongChoice from './components/SongChoice';

function App() {
  const [songs, setSongs] = useState([
    {
      path: "/musicWry/DADDYDADDYDOO.mp3",
      name: "Daddy Daddy Doo",
    },
    {
      path: "/musicWry/pop-stars.mp3",
      name: "Pop Stars",
    },
    {
      path: "/musicWry/racing-into-the-night.mp3",
      name: "Racing Into The Night",
    },
    {
      path: "/musicWry/renaicirculation.mp3",
      name: "Renai Circulation",
    },
    {
      path: "/musicWry/smoke-on-the-water.mp3",
      name: "Smoke On The Water"
    }
  ]);
  const lastSongIndex = songs.length - 1;
  const [isFirst, setIsFisrt] = useState(true);
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const seekerfill = useRef(null);
  const handleEnded = () => {
    if (currentSong < lastSongIndex) {
      setCurrentSong(currentSong + 1);
    } else {
      setCurrentSong(0);
    }
  }
  const handleSeeker = () => {
    const percentage = Math.round(audioRef.current.currentTime / audioRef.current.duration * 100);
    seekerfill.current.style.width = `${percentage.toString()}%`;
  }

  useEffect(() => {
    if (!isFirst) {
      audioRef.current.src = songs[currentSong].path;
      audioRef.current.currentTime = 0;
      handleSeeker();
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      setIsFisrt(false);
    }
  }, [currentSong]);
  return (
    <div className="App">
      <audio controls ref={audioRef} onTimeUpdate={handleSeeker} onEnded={handleEnded} >
        <source src="/musicWry/DADDYDADDYDOO.mp3" type="audio/mpeg" />
      </audio>
      <div className='song-list-search-cont'>
        <SearchBar songs={songs} />
        <div className='songs-cont'>
          {Object.entries(songs).map((owo, index) => {
            return <SongChoice songs={songs} currentSong={currentSong} setCurrentSong={setCurrentSong} index={index} />;
          })}
        </div>
      </div>
      <div className='player-cont'>
        <MusicPlayer songs={songs}
          seekerfill={seekerfill}
          audioRef={audioRef}
          handleSeeker={handleSeeker}
          lastSongIndex={lastSongIndex}
          currentSong={currentSong} setCurrentSong={setCurrentSong}
          isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      </div>
    </div>
  );
}

export default App;
