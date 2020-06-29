import React from 'react';

class LoadingSpinner extends React.Component {
  render() {
    return (
    <div style={{width: "100%"}}>
      <img
        src="http://developer.alexanderklimov.ru/android/views/progressbar_cat.gif"
        alt=""
        style={{margin: "auto", display: "block"}}
      />
    </div>
    );
  }
}

export default LoadingSpinner;
