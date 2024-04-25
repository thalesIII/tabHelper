import React from "react";
import { useSelector, useDispatch } from "react-redux";
import SongCard from "./SongCard.jsx";

const TabList = (props) => {
    // const getTabList = () => {
    //     const newSongs = [];
    //     fetch('tabs/list')
    //         .then(promise => promise.json())
    //         .then((data) => {
    //             for(let song of data){
    //                 newSongs.push(song);
    //             }
    //             setSongs(newSongs);
    //         })
    //         .catch(err => console.log('ERROR fetching songs: ', err))
    // }   
    const songbook = useSelector(state => state.editor.songbook);

    console.log('Page loaded --> songs: ', songbook);

    const tabs = [];
    let i = 0;
    for(const key in songbook){
        console.log('key', key)
        tabs.push(
            <SongCard info={songbook[key]} name={key} key={i++}/>
        );
    }

    return(
        <div>
            <h4> Your saved tabs: </h4>
            <div className="songList"> {tabs} </div>
        </div>
    )
}

export default TabList;