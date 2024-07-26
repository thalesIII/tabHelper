import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SongCard from "./SongCard.jsx";
import { togglePreview, turnPreviewPage } from "../../reducers/editorReducer.js";

import Button from '@mui/material/Button';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const TabList = (props) => {
    const dispatch = useDispatch();

    const songbook = useSelector(state => state.editor.songbook);
    const previewPage = useSelector(state => state.editor.previewPage);

    console.log('Page loaded --> songs: ', songbook);

    const togglePreviewDispatch = () => {
        return dispatch(togglePreview());
    }

    const previewPageHandler = (direction) => {
        return dispatch(turnPreviewPage(direction))
    }
    
    useEffect(() => {
        const turnPageWithArrows = (e) => {
            console.log('keypress', e.key, previewPage);
    
            if(previewPage === 0) return;
    
            if (e.key === 'ArrowLeft') { //left
                console.log('left arrow detected');
                return dispatch(turnPreviewPage(false));
            } else if (e.key === 'ArrowRight') { //right
                return dispatch(turnPreviewPage(true));
            }
        }

        document.addEventListener('keydown', turnPageWithArrows);

        return () => {
            document.removeEventListener('keydown', turnPageWithArrows);
        }
    }, [previewPage])

    const tabs = [];
    let i = 0;
    for(const key in songbook){
        console.log('key', key)
        tabs.push(
            <SongCard info={songbook[key]} name={key} key={i++}/>
        );
    }

    const previewTitlePage = <div>
        Make the title page
    </div>

    return(
        <div>
            <h4> Your saved tabs: </h4>
            <div>
                <button onClick={togglePreviewDispatch}> {(previewPage === 0) ? 'Preview Book' : 'Close Preview'} </button>
                <button> Download PDF </button>
            </div>
            <br/>
            {(previewPage === 0) 
            ? <div className="songList"> {tabs} </div>
            : <div className="songbookPreview">
                <div className="previewPageButtons">
                    {(previewPage > 1) ? <Button onClick={() => {previewPageHandler(false)}}> 
                        <ArrowCircleLeftIcon 
                                sx={{
                                width: 30,
                                color: 'black',
                                }} 
                        /> 
                    </Button> : <div></div>}
                    {(previewPage < Object.keys(songbook).length + 1) ? <Button onClick={() => {previewPageHandler(true)}}> 
                        <ArrowCircleRightIcon 
                            sx={{
                            width: 30,
                            color: 'black',
                            }} 
                        /> 
                    </Button> : <div></div>}
                </div>

                this is the preview - it needs: logic using pagePreview to determine which page is to be printed
                previewPage = 1 -- title Page
                previewPage = 2 -- song 1: index 0 in the songbook (obj.keys?) meaning (song index = previewPage - 2)
                
                Page {previewPage}/{(Object.keys(songbook).length + 1)}

                {(previewPage === 1)
                ? previewTitlePage
                : Object.entries(songbook[Object.keys(songbook)[previewPage - 2]])
                }

            </div>}
        </div>
    )
}

export default TabList;