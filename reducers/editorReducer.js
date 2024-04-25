import { createAction, createReducer } from '@reduxjs/toolkit';

const openEditor = createAction('OPEN_EDITOR');
const openTabList = createAction('OPEN_TABLIST');
const openImporter = createAction('OPEN_IMPORTER');
const changeCurrentTab = createAction('CHANGE_CURRENT_TAB');
const extendCurrentTab = createAction('EXTEND_CURRENT_TAB');

const defaultTab = `e <---------------------------------------------------------------------------------
B <---------------------------------------------------------------------------------
G <---------------------------------------------------------------------------------
D <---------------------------------------------------------------------------------
A <---------------------------------------------------------------------------------
E <---------------------------------------------------------------------------------`;
const initialState = {
    editorIsOpen: false,
    tablistIsOpen: false,
    importerIsOpen: false,
    currentTabName: '',
    currentTabSize: 85, // currentTabSize * 50 textarea cols
    currentTab: defaultTab
}

const editorReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(openEditor, (state, action) => { 
            console.log('opening editor...');
            if (action.payload) {
                state.currentTabName = action.payload.name;
                state.currentTab = action.payload.song;
            }else{
                state.currentTabName = '';
                state.currentTab = defaultTab;
            }
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

        .addDefaultCase((state, action) => {})
});

export { openEditor, openTabList, openImporter, changeCurrentTab, extendCurrentTab };
export default editorReducer;