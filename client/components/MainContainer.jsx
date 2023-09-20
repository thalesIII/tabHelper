import React from "react";

const MainContainer = () => {
    return (
        <div>
            <h2> Tab Helper </h2>
            <p> APP BY THOMAS HALES </p>
            <MainMenu />
        </div>
    )
}

const MainMenu = (props) => {
    return (
        <div>
            <hr/>
            <button> Create </button>,
            <button onClick={() => console.log('button click works')}> Saved Tabs </button>
            <hr/>
        </div>
    )
}

export default MainContainer;