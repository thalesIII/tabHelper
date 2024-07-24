import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { addToSongbook, changeCurrentTab, openTabList, resizeEditor } from "../../reducers/editorReducer.js";
import { parseGuitarTab } from "../lib/tabParser.js";

const blankEditorText = `e|--------------------------|---------------------------|----------------------|
B|--------------------------|---------------------------|----------------------|
G|--------------------------|---------------------------|----------------------|
D|--------------------------|---------------------------|----------------------|
A|--------------------------|---------------------------|----------------------|
E|--------------------------|---------------------------|----------------------|`;

const TabEditor = (props) => {
    const dispatch = useDispatch();

    const currentTab = useSelector(state => state.editor.currentTab);
    const { rows, cols } = useSelector(state => state.editor.editorSize);
    const { songName, artistName, tab } = currentTab;
    const tabText = parseGuitarTab(tab).length ? parseGuitarTab(tab) : blankEditorText;

    window.addEventListener('resize', () => {
        dispatch(resizeEditor());
    })

    const tabChange = (e) => {
        if(!currentTab.url){
            const name = document.getElementById('editorSongName').value;
            const artist = document.getElementById('editorArtistName').value;
            dispatch(changeCurrentTab({
                songName: name,
                artistName: artist,
                tab: e.target.value
            }));
        } else {
            dispatch(changeCurrentTab({
                tab: e.target.value
            }))
        }
    }

    const tabSave = async (e) => {
        //this needs to work for tabs which were made from scratch
        dispatch(addToSongbook(currentTab.url ? 'edit' : 'new'))
        //add to songbook. payload indicates when currentTab should be used over importedTab

        return dispatch(openTabList()); // navigates to the newly saved tab upon saving
    }

    const titleHolder = [
        <input id='editorSongName' placeholder="Song name..."/>,
        <input id='editorArtistName' placeholder="Artist..."/>
    ]
    const nameHolder = songName + " by " + artistName + " (edited)";

    return(
        <div>
            {currentTab.url ? nameHolder : titleHolder}
            <br/> <br/>
            <textarea id='tabWriter' wrap='off' cols={cols} rows={rows}
            defaultValue={tabText} onChange={tabChange}/>
            <div>
                <button className='editorBottom' onClick={tabSave}> Save </button>
                <p className='editorBottom'> </p>
            </div>
        </div>
    )
}

export default TabEditor;