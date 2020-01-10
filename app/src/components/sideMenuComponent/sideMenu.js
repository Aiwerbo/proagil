import React, { useEffect, useState } from 'react';
import ChessMessage from '../chessMessageComponent/chessMessage';
import MoveList from '../moveListComponent/moveList';
import './sideMenu.css'

const SideMenu = (props) => {

    return (
        <>
            <div className="sideMenu">
                <ChessMessage chessMessage={props.chessMessage} />
                <MoveList moveHistory={props.moveHistory}/>
            </div>
        </>
    );
};

export default SideMenu;
