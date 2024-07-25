import React from "react";
import { useSelector, useDispatch } from "react-redux";
import SongCard from "./SongCard.jsx";
import { togglePreview, turnPreviewPage } from "../../reducers/editorReducer.js";

const TabList = (props) => {
    const dispatch = useDispatch();

    const songbook = useSelector(state => state.editor.songbook);
    const previewPage = useSelector(state => state.editor.previewPage);

    console.log('Page loaded --> songs: ', songbook);

    const togglePreviewDispatch = () => {
        return dispatch(togglePreview());
    }

    const previewPageHandler = (direction) => {
        return dispatch(turnPreviewPage(direction))
    }

    const tabs = [];
    let i = 0;
    for(const key in songbook){
        console.log('key', key)
        tabs.push(
            <SongCard info={songbook[key]} name={key} key={i++}/>
        );
    }

    const previewTitlePage = <div>
        Make the title page
    </div>

    return(
        <div>
            <h4> Your saved tabs: </h4>
            <div>
                <button onClick={togglePreviewDispatch}> {(previewPage === 0) ? 'Preview Book' : 'Close Preview'} </button>
                <button> Download PDF </button>
            </div>
            <br/>
            {(previewPage === 0) 
            ? <div className="songList"> {tabs} </div>
            : <div className="songbookPreview">
                {(previewPage > 1) && <button onClick={() => {previewPageHandler(false)}}> page left </button>}
                {(previewPage < Object.keys(songbook).length + 1) && <button onClick={() => {previewPageHandler(true)}}> page right </button>}

                this is the preview - it needs: logic using pagePreview to determine which page is to be printed
                previewPage = 1 -- title Page
                previewPage = 2 -- song 1: index 0 in the songbook (obj.keys?) meaning (song index = previewPage - 2)
                
                Page {previewPage}/{(Object.keys(songbook).length + 1)}

                {(previewPage === 1)
                ? previewTitlePage
                : Object.entries(songbook[Object.keys(songbook)[previewPage - 2]])
                }

            </div>}
        </div>
    )
}

export default TabList;