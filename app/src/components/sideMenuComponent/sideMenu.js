import React, { useEffect, useState } from 'react';
import ChessMessage from '../chessMessageComponent/chessMessage';
import MoveList from '../moveListComponent/moveList';
import './sideMenu.css'

const SideMenu = (props) => {

    return (
        <>
            <div className="sideMenu">
                <ChessMessage chessMessage={props.chessMessage} />
                <div className="movieList-container">
                    <MoveList moveHistory={props.moveHistory}/>
                </div>
            </div>
        </>
    );
};

export default SideMenu;
