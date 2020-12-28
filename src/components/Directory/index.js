import React from 'react';
import ShopMen from './../../assets/bg.jpg';
import './styles.scss';

import Aladin from './../../assets/Aladin.jpg';
import SpiesinDisguise from './../../assets/SpiesinDisguise.jpg';
import Mosad from './../../assets/Mosad.jpg';
import Dora from './../../assets/Dora.jpg';

const Directory = props => {
  return (
    <div className="directory">
      <div className="wrap">
        <div>
        </div>
        <div
          className="item"
          style={{
            backgroundImage: `url(${ShopMen})`
          }}
        >
          <a>
            welcome to the best cinema website
          </a>
        </div>
      </div>
    </div>
  );
};

export default Directory;
