import React from "react";
import { useDispatch } from "react-redux";
import { openEditor, resizeEditor, removeFromSongbook } from "../../reducers/editorReducer";

const SongCard = ({ name, info }) => {
    const dispatch = useDispatch();

    const editorDispatch = (e) => {
        dispatch(resizeEditor());
        return dispatch(openEditor(info));
    }

    const deleteTab = (e) => {
        dispatch(removeFromSongbook(name));
        // in case of DB restoration
        // fetch('/tabs', {
        //     method: 'DELETE',
        //     headers: {
        //         "Content-Type": "application/json" 
        //     },
        //     body: JSON.stringify({id: song._id})
        // })
    } 

    return(
        <div className='songCard'>
            <div className="songHeader">
                <div>
                    <p> <b> {name} </b> <br/> {info.artistName} </p>
                </div>
                <div className="listButtons">
                    <button className='edit' onClick={editorDispatch}> Edit </button> 
                    <button className='del' onClick={deleteTab}> Delete </button>
                </div>
            </div>
            {/* <div className="tabDisplay">
                {strings}
            </div> */}
        </div>
    )
}

export default SongCard;