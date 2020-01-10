import React, { useEffect, useState } from 'react';
import './moveList.css'

const MoveList = (props) => {

    let moveHistory = props.moveHistory.map((x) => {
        if (x.color === 'w') {
            return (
                <div className="history_item">
                    White: From: {x.from}, To: {x.to}
                </div>
            )
        }
        else if (x.color === 'b') {
            return (
                <div className="history_item">
                    Black: From: {x.from}, To: {x.to}
                </div>
            )
        }

    })

    return (
        <>
            <div className="moveList">
                {moveHistory}
            </div>
        </>
    );
};

export default MoveList;
