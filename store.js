import { configureStore } from '@reduxjs/toolkit';

import editorReducer from './reducers/editorReducer.js';

const initialState = {
    editor: {
        editorIsOpen: false,
        tablistIsOpen: false,
        currentTabName: '',
        currentTabSize: 85,
        currentTab:
`e <--------------------------------------------------------------------------------
B <--------------------------------------------------------------------------------
G <--------------------------------------------------------------------------------
D <--------------------------------------------------------------------------------
A <--------------------------------------------------------------------------------
E <--------------------------------------------------------------------------------`
    }
}

const store = configureStore({
    reducer: {
        editor: editorReducer
    },
    preloadedState: initialState
});

export default store;