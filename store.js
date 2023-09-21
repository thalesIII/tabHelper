import { configureStore } from '@reduxjs/toolkit';

import editorReducer from './reducers/editorReducer.js';

const initialState = {
    editor: {
        editorIsOpen: false,
        tablistIsOpen: false,
        currentTabName: '',
        currentTabSize: 2, // currentTabSize * 50 textarea cols
        currentTab:
`<---------------------------------------------------------------------------------
<---------------------------------------------------------------------------------
<---------------------------------------------------------------------------------
<---------------------------------------------------------------------------------
<---------------------------------------------------------------------------------
<---------------------------------------------------------------------------------`
    }
}

const store = configureStore({
    reducer: {
        editor: editorReducer
    },
    preloadedState: initialState
});

export default store;