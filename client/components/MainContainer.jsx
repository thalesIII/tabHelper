import React from "react";
import TabEditor from "./TabEditor.jsx";
import TabImportSection from "./TabImportSection.jsx";
import TabList from "./TabList.jsx";
import MainMenu from "./MainMenu.jsx";

import { useSelector } from "react-redux";

const MainContainer = () => {
    const editorIsOpen = useSelector(state => state.editor.editorIsOpen);
    const tablistIsOpen = useSelector(state => state.editor.tablistIsOpen);
    const importerIsOpen = useSelector(state => state.editor.importerIsOpen);
    let bottom = <br/>;
    if(editorIsOpen) bottom = <TabEditor/>;
    if(tablistIsOpen) bottom = <TabList/>;
    if(importerIsOpen) bottom = <TabImportSection/>

    return (
        <div>
            <h2> Tab Helper </h2>
            <p> Quickly save/store guitar tabs  </p>
            <MainMenu />
            {bottom}
        </div>
    )
}

export default MainContainer;