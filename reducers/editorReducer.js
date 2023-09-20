import { createAction, createReducer } from '@reduxjs/toolkit';

const openEditor = createAction('OPEN_EDITOR');
const openTabList = createAction('OPEN_TABLIST');

const initialState = {
    editorIsOpen: false,
    tablistIsOpen: false,
    currentTabName: '',
}

const editorReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(openEditor, (state, action) => { 
            console.log('opening...');
            state.editorIsOpen = true;
            state.tablistIsOpen = false;
        })

        .addDefaultCase((state, action) => {})
});

export { openEditor, openTabList };
export default editorReducer;