import React from "react";

const SongCard = (props) => {
    //props: name, song, key=mongoID
    
    return(
        <div className='songcard'>
            <h5> {props.name} </h5>
            <p className='tabDisplay'> {props.song} </p>
        </div>
    )
}

export default SongCard;