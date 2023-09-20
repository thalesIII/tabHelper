import { configureStore } from '@reduxjs/toolkit';

import editorReducer from './reducers/editorReducer.js';

const store = configureStore({
    reducer: {
        editor: editorReducer
    }
});

export default store;