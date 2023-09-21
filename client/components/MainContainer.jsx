import React from "react";
import TabEditor from "./TabEditor.jsx";
import TabList from "./TabList.jsx";

import { useDispatch, useSelector } from "react-redux";
import { openEditor, openTabList } from "../../reducers/editorReducer.js";

const MainContainer = () => {
    const editorIsOpen = useSelector(state => state.editor.editorIsOpen);
    const tablistIsOpen = useSelector(state => state.editor.tablistIsOpen)
    let bottom = <br/>;
    if(editorIsOpen) bottom = <TabEditor/>;
    if(tablistIsOpen) bottom = <TabList/>;
    

    return (
        <div>
            <h2> Tab Helper </h2>
            <p> Quickly save/store guitar tabs  </p>
            <MainMenu />
            {bottom}
        </div>
    )
}

const MainMenu = (props) => {
    const dispatch = useDispatch();
    const editorDispatch = () => {
        console.log('dispatching openEditor...')
        return dispatch(openEditor());
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

export default MainContainer;