import React from "react";
import { useDispatch } from "react-redux";
import { openEditor, openTabList, openImporter, resizeEditor } from "../../reducers/editorReducer.js";

const MainMenu = (props) => {
    const dispatch = useDispatch();
    const editorDispatch = () => {
        console.log('dispatching openEditor...');
        dispatch(resizeEditor());
        return dispatch(openEditor(undefined));
    }
    const tabListDispatch = () => {
        console.log('dispatching openTabList...')
        return dispatch(openTabList());
    }
    const importDispatch = () => {
        console.log('dispatching openImporter...')
        return dispatch(openImporter());
    }

    return (
        <div>
            <hr/>
            <button onClick={editorDispatch}> Create </button>
            <button onClick={importDispatch}> Import Tabs </button>
            <button onClick={tabListDispatch}> Songbook </button>
            <hr/>
        </div>
    )
}

export default MainMenu;