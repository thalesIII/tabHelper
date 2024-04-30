import { configureStore } from '@reduxjs/toolkit';

import editorReducer from './reducers/editorReducer.js';

const defaultTab = { songName: '', artistName: '', tab: '' }

const initialState = {
    editor:     {
        editorIsOpen: false,
        tablistIsOpen: false,
        importerIsOpen: false,
        importSearchBar: '', // TabImportSection
        searchType: '',
        importedLinks: [],
        importedTab: defaultTab,
        currentTabSize: 85,     // currentTabSize * 50 textarea cols
        currentTab: defaultTab,
        songbook: {} // TabEditor aka Songbook
    }
}

const store = configureStore({
    reducer: {
        editor: editorReducer
    },
    preloadedState: initialState
});

export default store;