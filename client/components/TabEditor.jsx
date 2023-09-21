import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { changeCurrentTab, extentCurrentTab } from "../../reducers/editorReducer.js";

const TabEditor = (props) => {
    const dispatch = useDispatch();

    const cols = useSelector(state => state.editor.currentTabSize);
    const currTab = useSelector(state => state.editor.currentTab);

    const tabChange = (e) => {
        //event.target.value holds the current tab
        dispatch(changeCurrentTab(e.target.value));
    }

    const tabSave = async (e) => {
        const name = document.getElementById('tabName').value;
        const tab = currTab;
        //console.log('front end...', name, tab);

        try{
            await fetch('/tabs', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({"name": name, "song": tab})
            })
        } catch(err) {
            console.log('Error posting to server... ', err);
            return;
        }
        //update state upon successful fetch request? not necessary right now
    }

    return(
        <div>
            <input id='tabName' placeholder="Song name..."/> <br/>
            <textarea id='tabWriter' wrap='off' rows={6} cols={cols} 
            defaultValue={currTab} onChange={tabChange}/>
            <div>
                <button className='editorBottom' onClick={tabSave}> Save </button>
                <p className='editorBottom'> </p>
            </div>
        </div>
    )
}

export default TabEditor;