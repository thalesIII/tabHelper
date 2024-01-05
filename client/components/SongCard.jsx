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
        <div>
            <table className='songCard'> <tr>
                <td /> <p> {song.name} </p>
                <td /> <button className='edit'> Editor </button> <br/> <button className='del'> Delete </button>
            </tr><tr>
                <td className='tabDisplay'/> <p> {strings} </p>
            </tr></table>
        </div>
    )
}

export default SongCard;