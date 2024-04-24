import React, { useState, useEffect } from "react";
import TabEditor from "./TabEditor.jsx";
import TabList from "./TabList.jsx";
import MainMenu from "./MainMenu.jsx";

import { useSelector } from "react-redux";

const parseGuitarTab = (tabText) => {
    let printedTab = '';
    if(!tabText || !tabText.length) return printedTab;

    const sections = tabText.split('[/tab]'); // split sections by [tab] tag

    for (const section of sections) {
        const printedSection = section.replace(' ', '\n').replace('[tab]', '');
        printedTab += printedSection + '\n\n';
    }

    // console.log('orig ', tabText, 'printedTab ', printedTab);
    return printedTab;
}  

const MainContainer = () => {
    const editorIsOpen = useSelector(state => state.editor.editorIsOpen);
    const tablistIsOpen = useSelector(state => state.editor.tablistIsOpen)
    let bottom = <br/>;
    if(editorIsOpen) bottom = <TabEditor/>;
    if(tablistIsOpen) bottom = <TabList/>;

    const [tabInfo, setTabInfo] = useState({}); //sorry redux
    useEffect(() => {
        const requestTab = async () => {
            try {
                const t = await fetch('/tabs/api', {
                    method: 'GET',
                }); 
                console.log('response: ', t)
                const rStream = await t.text()
                const parsedStream = JSON.parse(rStream);
                setTabInfo(parsedStream);
            } catch (err) {
                console.log('error occured while requesting tab info')
            }
        }
        requestTab();
    }, []);

    const tabDisplay = (
        <div>
            <p> 
                <b> {tabInfo.songName} </b> by {tabInfo.artistName}
                <br/><br/>
                {parseGuitarTab(tabInfo.tab).split('\n').map((str, i) => (
                    <React.Fragment key={i}>
                        {str} 
                        <br/>
                    </React.Fragment>
                ))} 
            </p>
        </div>
    )

    return (
        <div>
            <h2> Tab Helper </h2>
            <p> Quickly save/store guitar tabs  </p>
            <MainMenu />
            {bottom}
            {/* {JSON.stringify(tab)}  testing fetch API to ultimate-guitar */}
            {tabDisplay}
        </div>
    )
}

export default MainContainer;