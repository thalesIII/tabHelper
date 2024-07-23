import { createAction, createReducer } from '@reduxjs/toolkit';

const openEditor = createAction('OPEN_EDITOR');
const openTabList = createAction('OPEN_TABLIST');
const openImporter = createAction('OPEN_IMPORTER');
const changeCurrentTab = createAction('CHANGE_CURRENT_TAB');
const resizeEditor = createAction('RESIZE_EDITOR');
const changeImportSearchBar = createAction('CHANGE_IMPORT_SEARCHBAR');
const setSearchType = createAction('SET_SEARCH_TYPE');
const importLinks = createAction('IMPORT_LINKS');
const importTab = createAction('IMPORT_TAB');
const clearImportedTab = createAction('CLEAR_IMPORTED_TAB');
const addToSongbook = createAction('ADD_TO_SONGBOOK');
const removeFromSongbook = createAction('REMOVE_FROM_SONGBOOK');

const defaultTab = { songName: '', artistName: '', tab: '' };

const initialState = {
    editorIsOpen: false,
    tablistIsOpen: false,
    importerIsOpen: false,
    importSearchBar: '', // TabImportSection
    searchType: '',
    importedLinks: [],
    page: 0,
    importedTab: defaultTab,
    currentTab: defaultTab,
    editorSize: {rows: 0, cols: 0},
    songbook: {} // TabEditor aka Songbook
}

const editorReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(openEditor, (state, action) => { 
            console.log('opening editor...');
            if (action.payload) {
                const songName = action.payload.name;
                const { artistName, tab } = action.payload.info;
                state.currentTab = {
                    songName,
                    artistName,
                    tab
                };
            } else state.currentTab = defaultTab;

            state.importerIsOpen = false;
            state.editorIsOpen = true;
            state.tablistIsOpen = false;
        })

        .addCase(openTabList, (state, action) => {
            console.log('opening tablist...');
            state.importerIsOpen = false;
            state.editorIsOpen = false;
            state.tablistIsOpen = true;
        })

        .addCase(openImporter, (state, action) => {
            console.log('opening tab importer...');
            state.importerIsOpen = true;
            state.editorIsOpen = false;
            state.tablistIsOpen = false;
            state.importSearchBar = '';
            state.searchType = '';
            state.page = 0;
        })

        .addCase(changeCurrentTab, (state, action) => {
            console.log('changing current tab...');
            const curr = state.currentTab
            const incoming = action.payload
            console.log(curr, incoming);

            //find difference between currTab - action.payload
            // for(let i = 0; i < curr.length; i++){
            //     if(curr[i].length !== incoming[i].length){
            //         //restore proper alignment/format while preserving the change
            //         if(curr[i].length > incoming[i].length) {
            //             incoming[i] = incoming[i].concat('-') //deletion
            //         }else{
            //             incoming[i] = incoming[i].slice(0, -2) //addition
            //         }
            //         state.currentTab = incoming.join('\n')
            //         break;
            //     }
            // }            
        })

        .addCase(resizeEditor, (state, action) => {
            // Rough, hardcoded estimates which fit the editor to the screen
            const charWidth = 7.2; // width of a character in pixels
            const lineHeight = 16; // height of a line in pixels
            state.editorSize.cols = Math.floor(window.innerWidth * .5 / charWidth);
            state.editorSize.rows = Math.floor((window.innerHeight - 185) * .5 / lineHeight); 
            // offset by the height of the main menu and title
        })

        .addCase(changeImportSearchBar, (state, action) => {
            state.importSearchBar = action.payload;
        })

        .addCase(setSearchType, (state, action) => {
            state.searchType = action.payload;
        })

        .addCase(importTab, (state, action) => {
            console.log('importing tab...');
            // state.importSearchBar = '';
            const { songName, artistName, rating, tab, author, contributors, url } = action.payload;
            state.importedTab = {
                songName,
                artistName,
                rating,
                tab,
                author,
                contributors,
                url
            }
        })

        .addCase(clearImportedTab, (state, action) => {
            state.importedTab = defaultTab;
        })

        .addCase(importLinks, (state, action) => {
            console.log('importing links...');

            state.importedTab = defaultTab;
            if(action.payload.fresh === true){
                state.importedLinks = [...action.payload.parsedStream];
                state.page = 0;
            } else {
                state.importedLinks = [...state.importedLinks, ...action.payload.parsedStream];
            }
            state.page = state.page + 1;
            console.log(state.page);
        })

        .addCase(addToSongbook, (state, action) => {
            console.log('adding to songbook...');
            if(state.importedTab.songName.length) {
                state.songbook = {
                    ...state.songbook,
                    [state.importedTab.songName]: {
                        artistName: state.importedTab.artistName,
                        tab: state.importedTab.tab
                    }
                }
            }
        })

        .addCase(removeFromSongbook, (state, action) => {
            console.log('deleting from songbook...');
            delete state.songbook[action.payload];
        })

        .addDefaultCase((state, action) => {})
});

export { 
    initialState,
    openEditor, 
    openTabList, 
    openImporter, 
    changeCurrentTab, 
    resizeEditor,
    changeImportSearchBar,
    setSearchType,
    importLinks,
    importTab,
    clearImportedTab,
    addToSongbook,
    removeFromSongbook
};
export default editorReducer;