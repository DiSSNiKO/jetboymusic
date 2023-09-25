import { fadeOutDoStuffThenFadeInLoadable, getMusicObjectArray } from "../utility";


function SongChoice(props) {
    const { setSongs, musik, picturePaths, musicImgSrcChanger, setPreviousSong, no, songs, currentSong, setCurrentSong, index } = props;
    function songChoiceClick(){
        const updatedSongs = songs;
        updatedSongs[currentSong].played++;
        setSongs(updatedSongs);
        setPreviousSong(currentSong);
        setCurrentSong(index);
    }
    return (
        <div className="song-choice" data-no={no} onClick={() => {
            fadeOutDoStuffThenFadeInLoadable(musik.current,songChoiceClick, musicImgSrcChanger, picturePaths);
        }}>
            <div className="hover-decor"></div>
            <img src="/images/wok.svg" alt="" />
            <img src="/images/elizabeth.png" alt="" className="elizabeth" />
            <h2>{songs[index].name}</h2>
            <h3>Plays: {songs[index].played}</h3>
        </div>
    );
}
export default SongChoice;