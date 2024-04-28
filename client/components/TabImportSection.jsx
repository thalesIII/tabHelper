import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchType, changeImportSearchBar, importTab, addToSongbook } from "../../reducers/editorReducer";
import { parseGuitarTab } from "../lib/tabParser";

const TabImportSection = (props) => {
    const dispatch = useDispatch();
    const importedTab = useSelector(state => state.editor.importedTab);
    const importSearchBar = useSelector(state => state.editor.importSearchBar);
    const searchType = useSelector(state => state.editor.searchType);

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

    const changeSearchType = (type) => {
        dispatch(setSearchType(type));
    }

    const searchHandler = () => {
        if(searchType === 'link'){
            requestTab();
        } else if(searchType === 'search'){
            return; // TBA
        }
    }
    
    const searchbarPlaceholder = (searchType === 'link')
        ? 'Enter an ultimate-guitar.com URL'
        : 'Enter a song or artist name'
    const tabDisplay = (
        <div>
            <h4> Get a tab from online </h4>
            <div id="searchMethodOptions">
                <input type="radio" name="searchMethod" id="link"
                    onClick={() => {changeSearchType('link')}}
                /> 
                <label for="link"> by its link </label>
                <input type="radio" name="searchMethod" id="search"
                    onClick={() => {changeSearchType('search')}}
                />
                <label for="search"> by searching the UG site </label>
            </div>
            <br/> <br/>
            {searchType && searchType.length && <div> 
                <input size='30' id='importSearch' placeholder={searchbarPlaceholder} onChange={handleURLchange}/>
                {'\t'} <button onClick={searchHandler}> Get Tab </button>
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
            </div>}
        </div>
    )

    return(
        <div className='tab'> {tabDisplay}</div>
    )
}

export default TabImportSection;