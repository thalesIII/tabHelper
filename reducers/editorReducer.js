import { createAction, createReducer } from '@reduxjs/toolkit';

const openEditor = createAction('OPEN_EDITOR');
const openTabList = createAction('OPEN_TABLIST');
const openImporter = createAction('OPEN_IMPORTER');
const changeCurrentTab = createAction('CHANGE_CURRENT_TAB');
const extendCurrentTab = createAction('EXTEND_CURRENT_TAB');
const changeImportSearchBar = createAction('CHANGE_IMPORT_SEARCHBAR');
const setSearchType = createAction('SET_SEARCH_TYPE');
const importLinks = createAction('IMPORT_LINKS');
const loadNextPage = createAction('LOAD_NEXT_PAGE')
const importTab = createAction('IMPORT_TAB');
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
    currentTabSize: 85,     // currentTabSize * 50 textarea cols
    currentTab: defaultTab,
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
        })

        .addCase(changeCurrentTab, (state, action) => {
            console.log('changing current tab...');
            const curr = state.currentTab.split('\n')
            const incoming = action.payload.split('\n')
            //console.log(curr, incoming);

            //find difference between currTab - action.payload
            for(let i = 0; i < curr.length; i++){
                if(curr[i].length !== incoming[i].length){
                    //restore proper alignment/format while preserving the change
                    if(curr[i].length > incoming[i].length) {
                        incoming[i] = incoming[i].concat('-') //deletion
                    }else{
                        incoming[i] = incoming[i].slice(0, -2) //addition
                    }
                    state.currentTab = incoming.join('\n')
                    break;
                }
            }            
        })

        .addCase(changeImportSearchBar, (state, action) => {
            state.importSearchBar = action.payload;
        })

        .addCase(setSearchType, (state, action) => {
            state.searchType = action.payload;
        })

        .addCase(importTab, (state, action) => {
            console.log('importing tab...');
            state.importSearchBar = '';
            const { songName, artistName, tab } = action.payload;
            state.importedTab = {
                songName,
                artistName,
                tab
            }
        })

        .addCase(loadNextPage, (state, action) => {
            state.page++; 
            //this could be combined with importTab ??
            //how will page be reset
        })

        .addCase(importLinks, (state, action) => {
            console.log('initial state', state.importedLinks);
            console.log('incoming: ', action.payload);
            
            console.log('importing links...');
            state.importedLinks = [...state.importedLinks, ...action.payload];
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
    extendCurrentTab,
    changeImportSearchBar,
    setSearchType,
    importLinks,
    loadNextPage,
    importTab,
    addToSongbook,
    removeFromSongbook
};
export default editorReducer;