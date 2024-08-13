import React from "react";
import { useSelector } from "react-redux";

const SongbookTitlePage = ({order}) => {
    const songbook = useSelector(state => state.editor.songbook);

    function formatDate() {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const now = new Date(Date.now());
        const month = months[now.getMonth()];
        const day = now.getDate();
        const year = now.getFullYear();
        
        return month + ' ' + day + ', ' + year;
    }

    return(
        <div className='titlePage'>
                <h2> Guitar Tablature Archive </h2>
                <h3> created on {formatDate()} </h3>
            <br/>
            {!!(order.length) ? <div>
                <h4> Table of Contents </h4>
                <table>
                    {order.map((song, i) => 
                        <tr>
                            <td>{i + 1}</td> 
                            <td>{songbook[song].songName}</td>
                        </tr>
                    )}
                </table>
            </div> : <p> add songs to see them here </p>}
        </div>
    )
}

export default SongbookTitlePage;