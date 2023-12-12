import React from "react";

const SongCard = ({ song }) => {
    //props: name, song, key=mongoID
    
    return(
        <div className='songcard'>
            <h5> {song.name} </h5>
            <p className='tabDisplay'> {song.song} </p>
        </div>
    )
}

export default SongCard;