import React, { useEffect, useState } from 'react';

const MoveList = (props) => {

    //Mappa ut props.moveHistory sen -> if (x.färgnyckel === 'w', vit färg, tvärtom om b)

    let moveHistory = props.moveHistory.map((x) => {

        return (
            <div className="history_item_container">
                <div className="history_item">
                    From: {x.from}, To: {x.to}
                </div>
            </div>
        )
    })

    const styleObj = {

    }

    return (
        <>
            <div className="moveList" style={styleObj}>
                {moveHistory}
            </div>
        </>
    );
};

export default MoveList;
