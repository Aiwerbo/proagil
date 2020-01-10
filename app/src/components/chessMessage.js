import React, { useEffect, useState } from 'react';

const ChessMessage = (props) => {
    
    const styleObj = {

    }

    return (
        <>
            <div className="chessMessage" style={styleObj}>
                {props.chessMessage}
            </div>
        </>
    );
};

export default ChessMessage;
