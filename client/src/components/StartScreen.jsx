import React from 'react';
import { BsXSquare } from "react-icons/bs";

import LeaderboardTable from './Leaderboard.jsx';

const StartScreen = (props) => {

  return (
    <div className='start'>
      <h2>Enter Username to Begin</h2>

      <input type="text" required name="username" placeholder="<username>" onChange={props.handleChange} />
      <br/>
      <br/>
      <button id='startButton' onClick={() => {props.beginGame()} }>Start</button>
      <br/>
      <br/>
      <h3>Match the video game screenshots to the correct game titles.</h3>
      <h3>You have 1 minute to try and get your name on the leaderboard.</h3>
      <h3>Good luck!</h3>
      <br/>
      <br/>
      <br/>
      <button onClick={() => {props.openLeaderboard()} }>View Leaderboard</button>

      <div className="popup" id="popup" >
        <BsXSquare className="bi bi-x-square" style={{ fontSize: "25px", position: "absolute", top: 0, right: 0, paddingRight: "10px", cursor : "pointer" }} onClick={ () => { props.hideLeaderboard() }} />
        <h3 style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >{'Leaderboard (Top 20)'}</h3>

        <LeaderboardTable highScores={props.highScores} />

      </div>
    </div>
  )
}



export default StartScreen;