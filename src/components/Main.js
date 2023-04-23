import React from 'react';
import Welcome from './Welcome.js';
import Hotelinfo from './Hotelinfo.js';

const Main = () => {
    return(
        <main id="wrapper">
          <Welcome />
          <Hotelinfo />
        </main>
    );
}

export default Main;