import React from 'react';
import { DNA } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="loader">
      <DNA type="TailSpin" color="#00BFFF" height={80} width={80} />
    </div>
  );
};

export default Loader;
