import { useEffect, useRef, useState } from 'react';
import './App.css';
import MusicPlayer from './components/MusicPlayer';
import SearchBar from './components/SearchBar';
import SongChoice from './components/SongChoice';

function App() {
  const [songs, setSongs] = useState([
    {
      path: "/musicWry/Ain't No Rest For The Wicked.mp3",
      name: "Ain't No Rest For The Wicked",
    },
    {
      path: "/musicWry/Blue Moon.mp3",
      name: "Blue Moon",
    },
    {
      path: "/musicWry/Enter Sandman.mp3",
      name: "Enter Sandman",
    },
    {
      path: "/musicWry/TUSK.mp3",
      name: "TUSK",
    },
    {
      path: "/musicWry/Smoke On The Water.mp3",
      name: "Smoke On The Water"
    },
    {
      path: "/musicWry/Fly Me To The Moon.mp3",
      name: "Fly Me To The Moon"
    },
    {
      path: "/musicWry/The Super Gore Nest.mp3",
      name: "The Super Gore Nest"
    },
    {
      path: "/musicWry/Samidare 20 Love.mp3",
      name: "Samidare 20 Love"
    },
    {
      path: "/musicWry/Short Change Hero.mp3",
      name: "Short Change Hero"
    },
    {
      path: "/musicWry/The Wanderer.mp3",
      name: "The Wanderer"
    }
  ]);
  const [searchKey, setSearchKey] = useState('');
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
        <SearchBar songs={songs} setSearchKey={setSearchKey} />
        <div className='songs-cont'>
          {Object.entries(songs).map((owo, index) => {
            if (searchKey === '') {
              return <SongChoice songs={songs} currentSong={currentSong} setCurrentSong={setCurrentSong} index={index} />;
            } else if (songs[index]['name'].toLowerCase().includes(searchKey.toLowerCase())) {
              return <SongChoice songs={songs} currentSong={currentSong} setCurrentSong={setCurrentSong} index={index} />;
            }
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
