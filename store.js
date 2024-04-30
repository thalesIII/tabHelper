import { configureStore } from '@reduxjs/toolkit';

import editorReducer, { initialState } from './reducers/editorReducer.js';

const store = configureStore({
    reducer: {
        editor: editorReducer
    },
    preloadedState: initialState
});

export default store;