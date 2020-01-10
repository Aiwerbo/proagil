import React, { useEffect, useState } from 'react';
import ChessMessage from './chessMessage.js';
import MoveList from './moveList.js';

const SideMenu = (props) => {
//Ska innehålla moveList och Message
    const styleObj = {
        height: "621px",
        width: "309px",
        position: "relative",
        border: "2px solid black",
        left: "19px",
    }

    return (
        <>
            <div className="sideMenu" style={styleObj}>
                <ChessMessage chessMessage={props.chessMessage} />
                <MoveList moveHistory={props.moveHistory}/>
            </div>
        </>
    );
};

export default SideMenu;
