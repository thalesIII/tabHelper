import React, { useEffect, useState } from "react";
import SongCard from "./SongCard.jsx";

const TabList = (props) => {
    const getTabList = () => {
        const newSongs = [];
        fetch('/tabs/list')
            .then(promise => promise.json())
            .then((data) => {
                //console.log('response...', data);
                for(let song of data){
                    newSongs.push(
                        <SongCard props={song} key={song._id}/>
                    );
                }
                //console.log('songs...', newSongs);
                setSongs(newSongs);
            })
            .catch(err => console.log('ERROR fetching songs: ', err))
    }   

    const [songs, setSongs] = useState([]);
    useEffect(() => {
        getTabList();
    }, []);
    console.log('Page loaded --> songs: ', songs);

    return(
        <div>
            <h4> Saved Tabs: </h4>
            {songs}
        </div>
    )
}

export default TabList;