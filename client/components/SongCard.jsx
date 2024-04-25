import React from "react";
import { useDispatch } from "react-redux";
import { openEditor } from "../../reducers/editorReducer";

const SongCard = ({ name, info }) => {
    const dispatch = useDispatch();

    console.log( name, info );

    
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
            body: JSON.stringify({id: song._id})
        })
            .then(getTabList());
    }

    return(
        <div className='songCard'>
            <div className="songHeader">
                <div>
                    <p> <b> {name} </b>  {'\n'} {info.artistName} </p>
                </div>
                <div className="listButtons">
                    <button className='edit' onClick={editorDispatch}> Edit </button> 
                    <button className='del' onClick={deleteTab}> Delete </button>
                </div>
            </div>
            <div className="tabDisplay">
                {/* {strings} */}
            </div>
        </div>
    )
}

export default SongCard;