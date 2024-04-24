import React, { useState, useEffect } from "react";
import TabEditor from "./TabEditor.jsx";
import TabList from "./TabList.jsx";

import { useDispatch, useSelector } from "react-redux";
import { changeCurrentTab, openEditor, openTabList } from "../../reducers/editorReducer.js";

const MainContainer = () => {
    const editorIsOpen = useSelector(state => state.editor.editorIsOpen);
    const tablistIsOpen = useSelector(state => state.editor.tablistIsOpen)
    let bottom = <br/>;
    if(editorIsOpen) bottom = <TabEditor/>;
    if(tablistIsOpen) bottom = <TabList/>;

    const [tab, setTab] = useState({});
    useEffect(() => {
        const requestTab = async () => {
            try {
                const t = await fetch('/tabs/api', {
                    method: 'GET',
                }); 
                console.log('response: ', t)
                const rstream = await t.text()
                setTab(rstream);
            } catch (err) {
                console.log('error occured while requesting tab info')
            }
        }
        requestTab();
    }, [])

    return (
        <div>
            <h2> Tab Helper </h2>
            <p> Quickly save/store guitar tabs  </p>
            <MainMenu />
            {bottom}
            {JSON.stringify(tab)} {/* testing fetch API to ultimate-guitar */}
        </div>
    )
}

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

export default MainContainer;