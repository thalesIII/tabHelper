import React from "react";
import TabEditor from "./TabEditor.jsx";

import { useDispatch, useSelector } from "react-redux";
import { openEditor, openTabList } from "../../reducers/editorReducer.js";

const MainContainer = () => {
    const { isOpen } = useSelector(state => state.editor.editorIsOpen);
    const editor = <br/>;
    if(isOpen) {
        editor = <TabEditor/>
    }

    return (
        <div>
            <h2> Tab Helper </h2>
            <p> APP BY THOMAS HALES </p>
            <MainMenu />
            {editor}
        </div>
    )
}

const MainMenu = (props) => {
    const dispatch = useDispatch();
    const editorDispatch = () => {
        console.log('dispatching openEditor...')
        return dispatch(openEditor());
    }
    const tabListDispatch = () => {}

    return (
        <div>
            <hr/>
            <button onClick={editorDispatch}> Create </button>
            <button onClick={() => console.log('button click works')}> Saved Tabs </button>
            <hr/>
        </div>
    )
}

export default MainContainer;