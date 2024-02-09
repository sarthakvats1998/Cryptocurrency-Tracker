import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

library.add(faMagnifyingGlass);

function Careers() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', height: '75vh' }}>
            <FontAwesomeIcon icon={faMagnifyingGlass} size="2xl" />
            <div style={{ marginTop: '30px', textAlign: 'center' }}>
                <h4 style={{ color: 'grey' }}>
                    Thank you for your interest, but there are no job openings available at this time.
                    <div>Please check back at another time!</div>
                </h4>
            </div>
        </div>
    );
}


export default Careers;