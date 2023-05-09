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
      played: 0
    },
    {
      path: "/musicWry/Blue Moon.mp3",
      name: "Blue Moon",
      played: 0
    },
    {
      path: "/musicWry/Enter Sandman.mp3",
      name: "Enter Sandman",
      played: 0
    },
    {
      path: "/musicWry/TUSK.mp3",
      name: "TUSK",
      played: 0
    },
    {
      path: "/musicWry/Smoke On The Water.mp3",
      name: "Smoke On The Water",
      played: 0
    },
    {
      path: "/musicWry/Fly Me To The Moon.mp3",
      name: "Fly Me To The Moon",
      played: 0
    },
    {
      path: "/musicWry/The Super Gore Nest.mp3",
      name: "The Super Gore Nest",
      played: 0
    },
    {
      path: "/musicWry/Samidare 20 Love.mp3",
      name: "Samidare 20 Love",
      played: 0
    },
    {
      path: "/musicWry/Short Change Hero.mp3",
      name: "Short Change Hero",
      played: 0
    },
    {
      path: "/musicWry/The Wanderer.mp3",
      name: "The Wanderer",
      played: 0
    }
  ]);
  const [previousSong, setPreviousSong] = useState(null);
  const [searchKey, setSearchKey] = useState('');
  const lastSongIndex = songs.length - 1;
  const [isFirst, setIsFisrt] = useState(true);
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const seekerfill = useRef(null);
  const handleEnded = () => {
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
  const handleSeeker = () => {
    const percentage = Math.round(audioRef.current.currentTime / audioRef.current.duration * 100);
    seekerfill.current.style.width = `${percentage.toString()}%`;
  }
  const currentStyling = (element) => {
    let prev = previousSong;
    if (!previousSong) {
      prev = 0;
    }
    const elem = document.querySelector(`[data-no="${prev}"]`);
    elem.style.transform = "";
    elem.querySelector('.hover-decor').style.minWidth = '';
    elem.querySelector('.hover-decor').style.maxWidth = '';
    elem.querySelector('.hover-decor').style.backgroundColor = '';
    element.style.transform = "rotate(-1deg) scale(1.02)";
    element.querySelector('.hover-decor').style.minWidth = '100%';
    element.querySelector('.hover-decor').style.maxWidth = '100%';
    element.querySelector('.hover-decor').style.backgroundColor = 'rgba(255, 152, 101, 0.8)';
  }
  useEffect(() => {
    if (!isFirst) {
      audioRef.current.src = songs[currentSong].path;
      audioRef.current.currentTime = 0;
      handleSeeker();
      audioRef.current.play();
      setIsPlaying(true);
      currentStyling(document.querySelector(`[data-no="${currentSong}"]`));
      localStorage.setItem("jetboymusic", JSON.stringify(songs));
    } else {
      setIsFisrt(false);
    }
  }, [currentSong]);
  useEffect(() => {
    if (localStorage.getItem("jetboymusic")) {
      setSongs(JSON.parse(localStorage.getItem("jetboymusic")));
      console.log('bitch??')
    }
    audioRef.current.src = songs[currentSong].path;
    audioRef.current.currentTime = 0;
    handleSeeker();
    setIsPlaying(false);
    currentStyling(document.querySelector(`[data-no="${currentSong}"]`));
  }, []);
  return (
    <div className="App">
      <audio controls ref={audioRef} onTimeUpdate={handleSeeker} onEnded={handleEnded} >
        <source src={songs[currentSong].path} type="audio/mpeg" />
      </audio>
      <div className='song-list-search-cont'>
        <SearchBar songs={songs} setSearchKey={setSearchKey} />
        <div className='songs-cont'>
          {Object.entries(songs).map((owo, index) => {
            if (searchKey === '') {
              return <SongChoice setSongs={setSongs} previousSong={previousSong} setPreviousSong={setPreviousSong} key={index} no={index} songs={songs} currentSong={currentSong} setCurrentSong={setCurrentSong} index={index} />;
            } else if (songs[index]['name'].toLowerCase().includes(searchKey.toLowerCase())) {
              return <SongChoice setSongs={setSongs} previousSong={previousSong} setPreviousSong={setPreviousSong} key={index} no={index} songs={songs} currentSong={currentSong} setCurrentSong={setCurrentSong} index={index} />;
            }
          })}
        </div>
      </div>
      <div className='player-cont'>
        <MusicPlayer songs={songs} setSongs={setSongs}
          previousSong={previousSong} setPreviousSong={setPreviousSong}
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
