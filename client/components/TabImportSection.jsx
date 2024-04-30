import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchType, changeImportSearchBar, importTab, addToSongbook, importLinks } from "../../reducers/editorReducer";
import { parseGuitarTab } from "../lib/tabParser";

const TabImportSection = (props) => {
    const dispatch = useDispatch();
    const importedTab = useSelector(state => state.editor.importedTab);
    const importedLinks = useSelector(state => state.editor.importedLinks);
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

    const requestTabSearch = async () => {
        if(!importSearchBar || !importSearchBar.length) {
            return;
        }
        console.log('requesting a search...')
        try {
            const t = await fetch('/search/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ searchParam: importSearchBar })
            }); 
            const rStream = await t.text()
            const parsedStream = JSON.parse(rStream);
            dispatch(importLinks(parsedStream))
            document.getElementById('importSearch').value = '';
        } catch (err) {
            console.log('error occured while searching for tabs:', err)
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
            requestTabSearch();
        }
    }
    
    const searchbarPlaceholder = (searchType === 'link')
        ? 'Enter an ultimate-guitar.com URL'
        : 'Enter a song or artist name'
    const searchButtonText = (searchType === 'link')
        ? 'Get tab'
        : 'Search for tabs'
    const tabSection = (importedTab && importedTab.songName.length)
        ?   (
                <p> 
                    <b> {importedTab.songName} </b> by {importedTab.artistName}
                    <br/> <br/>
                    {parseGuitarTab(importedTab.tab).split('\n').map((str, i) => (
                        <React.Fragment key={i}>
                            {str} 
                            <br/>
                        </React.Fragment>
                    ))} 
                </p>
        ) : null;
    const linkSection = (importedLinks && importedLinks.length)
        ?   (
            <table className='searchResultTable'> 
                <tr>
                    <td> <b> Title </b> </td>
                    <td> <b> Artist </b> </td>
                    <td> <b> Type </b> </td>
                    <td> <b> Difficulty </b> </td>
                </tr>
                {importedLinks.map((linkInfo) => (
                        <tr>
                            <td> {linkInfo.songName} </td>
                            <td> {linkInfo.artistName} </td>
                            <td> {linkInfo.type} </td>
                            <td> {linkInfo.difficulty} </td>
                            <td> <button> Import </button> </td>
                        </tr>
                    ))
                }
            </table>
        ) : null;
    const tabDisplay = (
        <div>
            {searchType && searchType.length && <div>
                <div>
                    <input size='30' id='importSearch' placeholder={searchbarPlaceholder} onChange={handleURLchange}/>
                    {'\t'} <button onClick={searchHandler}> {searchButtonText} </button>
                    {'\t'} {!!(importedTab && importedTab.songName.length) && 
                    <button onClick={songbookDispatch}> Add to your songbook </button>}
                </div>
                <hr/> <br/>
                <div>
                    {!!(importedTab && importedTab.songName.length) && tabSection}
                    {!!(importedLinks && importedLinks.length) && linkSection}
                </div> 
            </div>}
        </div>
    )

    return(
        <div> 
            <h4> Get a tab from online </h4>
            <div id="searchMethodOptions">
                <input type="radio" name="searchMethod" id="link"
                    onClick={() => {changeSearchType('link')}}
                /> 
                <label htmlFor="link"> by its link </label>
                <input type="radio" name="searchMethod" id="search"
                    onClick={() => {changeSearchType('search')}}
                />
                <label htmlFor="search"> by searching the UG site </label>
            </div>
            <br/> <br/>
            <div className='tab'> 
                {tabDisplay} 
            </div>
        </div>
    )
}

export default TabImportSection;