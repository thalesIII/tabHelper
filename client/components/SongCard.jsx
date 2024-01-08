import React from "react";
import { useDispatch } from "react-redux";
import { openEditor } from "../../reducers/editorReducer";

const SongCard = ({ song, getTabList }) => {
    const dispatch = useDispatch();

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
    
    const editorDispatch = (e) => {
        console.log('dispatching openEditor...')
        return dispatch(openEditor(song));
    }
    const deleteTab = (e) => {
        fetch('/tabs', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(song.name)
        })
            .then(getTabList());
    }

    return(
        <div className='songCard'>
            <div className="songHeader">
                <div>
                    <p> {song.name} </p>
                </div>
                <div className="listButtons">
                    <button className='edit' onClick={editorDispatch}> Edit </button> 
                    <button className='del' onClick={deleteTab}> Delete </button>
                </div>
            </div>
            <p className="tabDisplay"> {strings} </p>
        </div>
    )
}

export default SongCard;