import { createAction, createReducer } from '@reduxjs/toolkit';

const openEditor = createAction('OPEN_EDITOR');
const openTabList = createAction('OPEN_TABLIST');
const changeCurrentTab = createAction('CHANGE_CURRENT_TAB');
const extentCurrentTab = createAction('EXTEND_CURRENT_TAB');

const initialState = {
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

const editorReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(openEditor, (state, action) => { 
            console.log('opening editor...');
            state.editorIsOpen = true;
            state.tablistIsOpen = false;
        })

        .addCase(openTabList, (state, action) => {
            console.log('opening tablist...');
            state.editorIsOpen = false;
            state.tablistIsOpen = true;
        })

        .addCase(changeCurrentTab, (state, action) => {
            console.log('changing current tab...');

        })

        .addDefaultCase((state, action) => {})
});

export { openEditor, openTabList, changeCurrentTab, extentCurrentTab };
export default editorReducer;