import React from "react";

const SongCard = ({ song }) => {
    //props: name, song, key=mongoID
    const strings = [];
    for(const string of song.song.split('\n')){
        const letter = string[0];

        strings.push(
            <div>
                <p><b>{letter}</b> {string.slice(2)}</p>
            </div>
        )
    }
    
    return(
        <div className='songCard'>
                <td className='songCardTitle'/> <h5> {song.name} </h5>
                <td/> <p className='tabDisplay'> {strings} </p>
        </div>
    )
}

export default SongCard;