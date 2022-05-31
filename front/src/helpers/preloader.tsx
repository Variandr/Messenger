import React from 'react';
import preloader from '../assets/preloader.gif';

const Preloader: React.FC = () => {
  return (
    <div className="center">
      <img src={preloader} alt="preloader" />
    </div>
  );
};
export default Preloader;
