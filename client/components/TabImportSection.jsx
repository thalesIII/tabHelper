import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchType, changeImportSearchBar, importTab, addToSongbook, importLinks, clearImportedTab } from "../../reducers/editorReducer";
import PreviewPage from "./PreviewPage.jsx";

const TabImportSection = (props) => {
    const dispatch = useDispatch();
    const importedTab = useSelector(state => state.editor.importedTab);
    const importedLinks = useSelector(state => state.editor.importedLinks);
    const importSearchBar = useSelector(state => state.editor.importSearchBar);
    const searchType = useSelector(state => state.editor.searchType);
    const page = useSelector(state => state.editor.page);

    const requestTab = async (url) => {
        if(!url && (!importSearchBar || !importSearchBar.length)) {
            return;
        }
        try {
            const t = await fetch('/tabs/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ URL: (url || importSearchBar) })
            }); 
            const rStream = await t.text()
            const parsedStream = JSON.parse(rStream);
            if(!parsedStream.err) {
                dispatch(importTab(parsedStream))
            } else {
                return;
            }
            document.getElementById('importSearch').value = '';
        } catch (err) {
            console.log('error occured while requesting tab info:', err)
        }
    }

    const requestTabSearch = async (fresh) => {
        if(!linksLoaded && (!importSearchBar || !importSearchBar.length)) {
            return;
        }
        console.log('requesting a search...', fresh)
        try {
            const t = await fetch('/search/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    searchParam: importSearchBar,
                    page: fresh ? 1 : (page + 1)
                })
            }); 
            const rStream = await t.text()
            const parsedStream = JSON.parse(rStream);
            dispatch(importLinks({
                parsedStream,
                fresh
            }));
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
        return dispatch(addToSongbook('import'));
    }

    const changeSearchType = (type) => {
        dispatch(setSearchType(type));
    }

    const searchHandler = (fresh) => {
        if(searchType === 'link'){
            requestTab();
        } else if(searchType === 'search'){
            requestTabSearch(fresh);
        }
    }
    
    const searchbarPlaceholder = (searchType === 'link')
        ? 'Enter an ultimate-guitar.com URL'
        : 'Enter a song or artist name';
    const searchButtonText = (searchType === 'link')
        ? 'Get tab'
        : 'Search for tabs';

    const tabsLoaded = !!(importedTab && importedTab.songName.length);
    const linksLoaded = !!(importedLinks && importedLinks.length);

    const linkSection = (importedLinks && importedLinks.length)
        ?   (
            <div>
                <table className='searchResultTable'> 
                    <tr>
                        <td> <b> Title </b> </td>
                        <td> <b> Artist </b> </td>
                        <td> <b> Rating </b> </td>
                        <td> <b> Type </b> </td>
                        <td> <b> Difficulty </b> </td>
                    </tr>
                    {importedLinks.map((linkInfo) => (
                            <tr>
                                <td> {linkInfo.songName} </td>
                                <td> {linkInfo.artistName} </td>
                                <td> {linkInfo.rating} </td>
                                <td> {linkInfo.type} </td>
                                <td> {linkInfo.difficulty} </td>
                                <td> <button onClick={() => {requestTab(linkInfo.tabUrl)}}> Import </button> </td>
                            </tr>
                        ))
                    }
                </table>
                {importSearchBar && importSearchBar.length && <button onClick={() => {searchHandler(false)}}> More </button>}
            </div>
        ) : null;
    const tabDisplay = (
        <div>
            {searchType && searchType.length && <div>
                <div>
                    <input size='30' id='importSearch' placeholder={searchbarPlaceholder} onChange={handleURLchange}/>
                    {'\t'} <button onClick={() => {searchHandler(true)}}> {searchButtonText} </button>
                    {'\t'} {!!(importedTab && importedTab.songName.length) && 
                    <button onClick={songbookDispatch}> Add to your songbook </button>}
                </div>
                <hr/> <br/>
                <div>
                    {tabsLoaded && <div> 
                        {!!(importedLinks && importedLinks.length) &&
                        <button onClick={() => {dispatch(clearImportedTab())}}> Back to search results </button>} 
                        <PreviewPage previewTab={importedTab}/> 
                    </div>}
                    {(!tabsLoaded && linksLoaded) && linkSection}
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