function SongChoice(props) {
    const { songs, currentSong, setCurrentSong, index } = props
    return (
        <div className="song-choice" onClick={() => {
            setCurrentSong(index);
        }}>
            <div className="hover-decor"></div>
            <img src="/images/wok.svg" alt="" />
            <img src="/images/elizabeth.png" alt="" className="elizabeth" />
            <h2>{songs[index].name}</h2>
        </div>
    );
}
export default SongChoice;