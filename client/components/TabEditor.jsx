import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";

const TabEditor = (props) => {
    let cols = useSelector(state => state.editor.currentTabSize);
    let currTab = useSelector(state => state.editor.currentTab);

    return(
        <div>
           <input id='tabName' placeholder="Song name..."/> <br/>
           <textarea rows={6} cols={cols * 50} value={currTab}/>
        </div>
    )
}

export default TabEditor;