import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { changeCurrentTab, extentCurrentTab } from "../../reducers/editorReducer.js";
import { parseGuitarTab } from "../lib/tabParser.js";

const TabEditor = (props) => {
    const dispatch = useDispatch();

    const cols = useSelector(state => state.editor.currentTabSize);
    const { songName, artistName, tab } = useSelector(state => state.editor.currentTab);
    const tabText = parseGuitarTab(tab);

    const tabChange = (e) => {
        dispatch(changeCurrentTab(e.target.value));
    }

    const tabSave = async (e) => {
        const name = document.getElementById('tabName').value;
        const tab = currentTab;

        try{
            await fetch('/tabs', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({"name": name, "song": tab})
            })
        } catch(err) {
            console.log('Error posting to server... ', err);
            return;
        }
    }

    const titleHolder = [
        <input id='editorSongName' placeholder="Song name..."/>,
        <input id='editorArtistName' placeholder="Artist..."/>
    ]
    const nameHolder = songName + " by " + artistName + " (edited)";

    return(
        <div>
            {songName.length ? nameHolder : titleHolder}
            <br/> <br/>
            <textarea id='tabWriter' wrap='off' rows={6} cols={cols} 
            defaultValue={tabText} onChange={tabChange}/>
            <div>
                <button className='editorBottom' onClick={tabSave}> Save </button>
                <p className='editorBottom'> </p>
            </div>
        </div>
    )
}

export default TabEditor;