import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SongCard from "./SongCard.jsx";
import PreviewPage from "./PreviewPage.jsx";
import { togglePreview, turnPreviewPage } from "../../reducers/editorReducer.js";

import Button from '@mui/material/Button';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const TabList = (props) => {
    const dispatch = useDispatch();

    const songbook = useSelector(state => state.editor.songbook);
    const previewPageNum = useSelector(state => state.editor.previewPageNum);

    console.log('Page loaded --> songs: ', songbook);

    const togglePreviewDispatch = () => {
        return dispatch(togglePreview());
    }

    const previewPageHandler = (direction) => {
        return dispatch(turnPreviewPage(direction))
    }
    
    useEffect(() => {
        const turnPageWithArrows = (e) => {
            console.log('keypress', e.key, previewPageNum);
    
            if(previewPageNum === 0) return;
    
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
    }, [previewPageNum])

    const tabs = [];
    let i = 0;
    for(const key in songbook){
        console.log('key', key)
        tabs.push(
            <SongCard info={songbook[key]} name={key} key={i++}/>
        );
    }

    const previewTitlePage = <div>
        <h2> Guitar Tablature Archive </h2>
        <h3> created on {Date.now()} </h3>
        <br/>
        <h4> Table of Contents </h4>
        {Object.keys(songbook).map((song, i) => 
            <p>{i}... <t/> {song.songName} </p>
        )}
    </div>

    return(
        <div>
            <h4> Your saved tabs: </h4>
            <div>
                <button onClick={togglePreviewDispatch}> {(previewPageNum === 0) ? 'Preview Book' : 'Close Preview'} </button>
                <button> Download PDF </button>
            </div>
            <br/>
            {(previewPageNum === 0) 
            ? <div className="songList"> {tabs} </div>
            : <div className="songbookPreview">
                Page {previewPageNum}/{(Object.keys(songbook).length + 1)}
                <div className="previewPageButtons">
                    {(previewPageNum > 1) ? <Button onClick={() => {previewPageHandler(false)}}> 
                        <ArrowCircleLeftIcon 
                                sx={{
                                width: 30,
                                color: 'black',
                                }} 
                        /> 
                    </Button> : <div></div>}
                    {(previewPageNum < Object.keys(songbook).length + 1) ? <Button onClick={() => {previewPageHandler(true)}}> 
                        <ArrowCircleRightIcon 
                            sx={{
                            width: 30,
                            color: 'black',
                            }} 
                        /> 
                    </Button> : <div></div>}
                </div>

                {/* this is the preview - it uses logic using pagePreview to determine which page is to be printed
                previewPage = 1 -- title Page
                previewPage = 2 -- song 1: index 0 in the songbook (obj.keys?) meaning (song index = previewPage - 2) 
                
            */}
                
                <br/>

                {(previewPageNum === 1)
                ? previewTitlePage
                : <PreviewPage songIndex={previewPageNum - 2}/>
                }

            </div>}
        </div>
    )
}

export default TabList;