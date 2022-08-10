import React from 'react';

const StartScreen = (props) => {

  return (
    <div className='start'>
      <h2>Enter Username to Begin</h2>
      <input type="text" required name="username" placeholder="<username>" onChange={props.handleChange} />
      <br/>
      <br/>
      <button id='startButton' onClick={() => {props.beginGame()} }>Start</button>
    </div>
  )
}



export default StartScreen;