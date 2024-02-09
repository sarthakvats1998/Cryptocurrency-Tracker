import React from 'react';

function CoinInfo(props) {
    return (
        <div>
            Info of {props.data.name}
            {console.log(props.data)}
        </div>
    );
}

export default CoinInfo;