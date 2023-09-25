import { useEffect, useRef, useState } from 'react';
import './App.css';
import MusicPlayer from './components/MusicPlayer';
import SearchBar from './components/SearchBar';
import SongChoice from './components/SongChoice';
import { randomPic, arrayWithoutElem, getMusicObjectArray } from './utility';


function App() {
  const [picturePaths, setPicturePaths] =useState(['/images/musig.jpg','/images/bocchithegoat.jpg','/images/hokagokingtime.jpg','/images/mondayleftme86.jpg','/images/mondayleftmefixed.jpg']);
  const [songs, setSongs] = useState(getMusicObjectArray(`Ain't No Rest For The Wicked.mp3
  Alessia Cara - Here.mp3
  Arctic Monkeys - Do I Wanna Know_ (Official Video).mp3
  Bamboleo x Narcos (Nalo Remix).mp3
  Bishop Briggs - River.mp3
  Blue Moon.mp3
  Collide.mp3
  Diplo - Revolution (feat. Faustix & Imanos and Kai) [SEAN&BOBO Remix].mp3
  Doja Cat - Streets (Official Video).mp3
  Dua Lipa - Blow Your Mind (Mwah) (Official Video).mp3
  Dua Lipa - Break My Heart (Official Video).mp3
  Dua Lipa - Don't Start Now (Official Music Video).mp3
  Dua Lipa - Levitating Featuring DaBaby (Official Music Video).mp3
  Dua Lipa - Love Again (Official Music Video).mp3
  Dua Lipa - New Rules (Official Music Video).mp3
  Egzod & Maestro Chives - Royalty (ft. Neoni) [Official Lyric Video].mp3
  Egzod, Maestro Chives & Alaina Cross - No Rival [Official Lyric Video].mp3
  Enter Sandman.mp3
  Everybody Knows - Sigrid Clip HD (Justice League).mp3
  Fly Me To The Moon.mp3
  G-Eazy & Bebe Rexha - Me, Myself & I (Lyrics).mp3
  G-Eazy & Halsey - Him & I (Official Video).mp3
  Gustavo Bravetti - Babel (Visualizer).mp3
  Harry Styles - Watermelon Sugar (Official Audio).mp3
  Imagine Dragons - Bad Liar (Official Music Video).mp3
  Imagine Dragons - Believer (Official Music Video).mp3
  Imagine Dragons - Demons (Official Music Video).mp3
  Imagine Dragons - Natural.mp3
  Imagine Dragons - Radioactive.mp3
  Imagine Dragons - Thunder.mp3
  Imagine Dragons - Whatever It Takes (Official Music Video).mp3
  Infirmary blues.mp3
  Masked Wolf - Astronaut In The Ocean (Official Music Video).mp3
  Metro Boomin - Space Cadet (Official Music Video) ft. Gunna.mp3
  Mr. Kitty, The Neighbourhood - After Dark X Sweater Weather (TikTok Mashup) [Lyrics].mp3
  NEFFEX - Cold [Copyright Free] No.60.mp3
  NEFFEX - Free Me  [Copyright Free] No.134.mp3
  NEFFEX - Go!  [Copyright-Free] No.147.mp3
  Samidare 20 love.mp3
  Short Change Hero.mp3
  Smoke On The Water.mp3
  Taylor Swift - Blank Space.mp3
  Tech N9ne - Erbody But Me ft. Krizz Kaliko, Bizzy.mp3
  The Score - Born For This (Official Audio).mp3
  The Super Gore Nest.mp3
  The Wanderer.mp3
  The Weeknd - After Hours (Lyrics).mp3
  The Weeknd - Blinding Lights (Official Audio).mp3
  The Weeknd - Call Out My Name.mp3
  The Weeknd - Can't Feel My Face.mp3
  The Weeknd - Save Your Tears.mp3
  The Weeknd - Starboy.mp3
  The Weeknd - The Hills.mp3
  TUSK.mp3
  Unlike Pluto - Everything Black (feat. Mike Taylor) [Official Lyric Video].mp3
  Vosai & Facading - Crossed The Line (feat. Linn Sandin) [NCS Release].mp3
  Why'd You Only Call Me When You're High_  Arctic Monkeys Lyrics.mp3`));
  const [previousSong, setPreviousSong] = useState(null);
  const [searchKey, setSearchKey] = useState('');
  const lastSongIndex = songs.length - 1;
  const [isFirst, setIsFisrt] = useState(true);
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const seekerfill = useRef(null);
  const pauseBtn = useRef(null);
  const musik = useRef(null);
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
  const handlePause = () => {
    if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
    } else {
        audioRef.current.play();
        setIsPlaying(true);
    }
}
const handlePauseSpacebar = (e)=>{
  if(e.key==" "){
    pauseBtn.current.click();
  }
}
const musicImgSrcChanger = (elem, picturePaths) => {
  elem.src = randomPic(arrayWithoutElem(elem.src, picturePaths));
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
  }
  audioRef.current.src = songs[currentSong].path;
  audioRef.current.currentTime = 0;
  handleSeeker();
  setIsPlaying(false);
  currentStyling(document.querySelector(`[data-no="${currentSong}"]`));},
[]);
useEffect(()=>{
  document.addEventListener('keydown', handlePauseSpacebar, false)},
[]);

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
              return <SongChoice picturePaths={picturePaths} musik={musik} musicImgSrcChanger={musicImgSrcChanger} setSongs={setSongs} previousSong={previousSong} setPreviousSong={setPreviousSong} key={index} no={index} songs={songs} currentSong={currentSong} setCurrentSong={setCurrentSong} index={index} />;
            } else if (songs[index]['name'].toLowerCase().includes(searchKey.toLowerCase())) {
              return <SongChoice picturePaths musik setSongs={setSongs} musicImgSrcChanger={musicImgSrcChanger} previousSong={previousSong} setPreviousSong={setPreviousSong} key={index} no={index} songs={songs} currentSong={currentSong} setCurrentSong={setCurrentSong} index={index} />;
            }
          })}
        </div>
      </div>
      <div className='player-cont'>
        <MusicPlayer songs={songs} setSongs={setSongs}
          previousSong={previousSong} setPreviousSong={setPreviousSong}
          pauseBtn={pauseBtn}
          musik = {musik}
          musicImgSrcChanger={musicImgSrcChanger}
          picturePaths = {picturePaths}
          handlePause = {handlePause}
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
