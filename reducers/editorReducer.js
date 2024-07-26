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
const togglePreview = createAction('TOGGLE_PREVIEW');
const turnPreviewPage = createAction('TURN_PREVIEW_PAGE');

const defaultTab = { songName: '', artistName: '', tab: '', source: 'original' };
// source: original, import, import-edited

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
    songbook: {}, // TabEditor aka Songbook
    previewPageNum: 0
}

const editorReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(openEditor, (state, action) => { 
            console.log('opening editor...');
            if (action.payload) {
                state.currentTab = {
                    ...action.payload,
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
            state.previewPage = 0;
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
            console.log(action.payload);
            
            state.currentTab = Object.assign(state.currentTab, action.payload);
            if(state.currentTab.source === 'import') state.currentTab.source = 'import-edited';
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
                url,
                source: 'import'
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
            console.log('adding to songbook: ', action.payload); 
            // payload to indicate that currentTab should be used over importedTab
            if(action.payload === 'new'){
                state.songbook = {
                    ...state.songbook,
                    [state.currentTab.songName]: {
                        ...state.currentTab,
                        author: 'user', // for new tabs, the author and url property are hardcoded to indicate the user's tab
                        url: 'none'
                    }
                }
            } else if(action.payload === 'edit'){
                state.songbook = {
                    ...state.songbook,
                    [state.currentTab.songName]: {
                        ...state.currentTab
                    }
                }
            } else if(action.payload === 'import' && state.importedTab.songName.length) {
                state.songbook = {
                    ...state.songbook,
                    [state.importedTab.songName]: {
                        ...state.importedTab
                    }
                }
            }
        })

        .addCase(removeFromSongbook, (state, action) => {
            console.log('deleting from songbook...');
            delete state.songbook[action.payload];
        })

        .addCase(togglePreview, (state, action) => {
            state.previewPageNum = (state.previewPageNum > 0) ? 0 : 1;
        })

        .addCase(turnPreviewPage, (state, action) => {
            const newPage = state.previewPageNum + (action.payload ? 1 : -1);
            if(newPage < 1 || newPage > Object.keys(state.songbook).length + 1){
                return; // bounds check
            }
            state.previewPageNum = newPage;
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
    removeFromSongbook,
    togglePreview,
    turnPreviewPage
};
export default editorReducer;