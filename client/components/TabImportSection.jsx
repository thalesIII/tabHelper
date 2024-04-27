import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeImportSearchBar, importTab, addToSongbook } from "../../reducers/editorReducer";
import { parseGuitarTab } from "../lib/tabParse";

const TabImportSection = (props) => {
    const dispatch = useDispatch();
    const importedTab = useSelector(state => state.editor.importedTab);
    const importSearchBar = useSelector(state => state.editor.importSearchBar);

    const requestTab = async () => {
        if(!importSearchBar || !importSearchBar.length) {
            return;
        }
        try {
            const t = await fetch('/tabs/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ URL: importSearchBar })
            }); 
            const rStream = await t.text()
            const parsedStream = JSON.parse(rStream);
            dispatch(importTab(parsedStream));
            document.getElementById('importSearch').value = '';
        } catch (err) {
            console.log('error occured while requesting tab info:', err)
        }
    }

    const handleURLchange = (e) => {
        const URL = e.target.value;
        dispatch(changeImportSearchBar(URL))
    }

    const songbookDispatch = () => {
        if(!importedTab || !importedTab.songName) {
            return;
        }
        dispatch(addToSongbook())
    }

    const tabDisplay = (
        <div>
            <h4> Get a tab from online </h4>
            <input type="radio" name="searchMethod" id="link"/> 
                <label for="link"> by its link </label>
            <input type="radio" name="searchMethod" id="search"/>
                <label for="search"> by searching </label>
            <br/> <br/>
            <input size='30' id='importSearch' placeholder='Enter an ultimate-guitar.com URL' onChange={handleURLchange}/>
            {'\t'} <button onClick={requestTab}> Get Tab </button>
            {'\t'} <button onClick={songbookDispatch}> Add to your songbook </button>
            <hr/> <br/>
            {importedTab && importedTab.songName.length && <p> 
                <b> {importedTab.songName} </b> by {importedTab.artistName}
                <br/> <br/>
                {parseGuitarTab(importedTab.tab).split('\n').map((str, i) => (
                    <React.Fragment key={i}>
                        {str} 
                        <br/>
                    </React.Fragment>
                ))} 
            </p>}
        </div>
    )

    return(
        <div className='tab'> {tabDisplay}</div>
    )
}

export default TabImportSection;