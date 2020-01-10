import React, { useEffect, useState } from 'react';
import './chessMessage.css'

const ChessMessage = (props) => {

    return (
        <>
            <div className="chessMessage">
                {props.chessMessage}
            </div>
        </>
    );
};

export default ChessMessage;
