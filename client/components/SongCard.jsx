import React from "react";

const SongCard = ({ song }) => {
    //props: name, song, key=mongoID
    const PREVIEWED_BEATS = 50;

    const strings = [];
    for(const string of song.song.split('\n')){
        const letter = string[0];

        strings.push(
            <div>
                <p><b>{letter}</b> {string.slice(2, PREVIEWED_BEATS)}</p>
            </div>
        )
    }
    
    return(
        <div className='songCard'>
            <div className="songHeader">
                <div>
                    <p> {song.name} </p>
                </div>
                <div className="listButtons">
                    <button className='edit'> Edit </button> 
                    <button className='del'> Delete </button>
                </div>
            </div>
            <p className="tabDisplay"> {strings} </p>
        </div>
    )
}

export default SongCard;