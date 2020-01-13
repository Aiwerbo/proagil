import React from 'react';
import ChessMessage from '../chessMessageComponent/chessMessage';
import MoveList from '../moveListComponent/moveList';
import './sideMenu.css';

const SideMenu = (props) => (
  <>
    <div className="sideMenu">
      <ChessMessage chessMessage={props.chessMessage} />
      <div className="movieList-container">
        <MoveList moveHistory={props.moveHistory} />
      </div>
    </div>
  </>
);

export default SideMenu;
