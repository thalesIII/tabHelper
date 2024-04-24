import React from "react";
import { useDispatch } from "react-redux";
import { openEditor, openTabList } from "../../reducers/editorReducer.js";

const MainMenu = (props) => {
    const dispatch = useDispatch();
    const editorDispatch = () => {
        console.log('dispatching openEditor...');
        return dispatch(openEditor(undefined));
    }
    const tabListDispatch = () => {
        console.log('dispatching openTabList...')
        return dispatch(openTabList());
    }

    return (
        <div>
            <hr/>
            <button onClick={editorDispatch}> Create </button>
            <button onClick={tabListDispatch}> Saved Tabs </button>
            <hr/>
        </div>
    )
}

export default MainMenu;