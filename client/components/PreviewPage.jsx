import React from "react";
import { useSelector } from "react-redux";

const PreviewPage = ({ songIndex }) => {
    const songbook = useSelector(state => state.editor.songbook)
    const songOrder = Object.keys(songbook).sort();

    return(
        <div> 
            {Object.entries(songbook[songOrder[songIndex]])} 
        </div>
    )
}

export default PreviewPage;