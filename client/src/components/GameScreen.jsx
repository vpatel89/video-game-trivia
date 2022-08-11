import React from 'react';

const GameScreen = (props) => {

  return (
    <div className='game'>
      <h1 onClick={() => { props.getLeaderboard() }}>Game is about to begin</h1>

      <div className='triviaSection'>
        <div id='timer'>{ 'Timer: ' + props.timer }</div>
        <div id='score'>{ 'Score: ' + props.currentScore }</div>

        <div className='imageDiv'>
          <img id='gameImage' onLoad={ () => {props.startTimer()} } src={ props.gameImage } alt="..." />
        </div>

        <h2>Guess the game based on the Screenshot</h2>
        <div className='answerOptions'>
          <button onClick={() => { props.checkAnswer() }}>{ props.option1 }</button>
          <button onClick={() => { props.checkAnswer() }}>{ props.option2 }</button>
          <button onClick={() => { props.checkAnswer() }}>{ props.option3 }</button>
          <button onClick={() => { props.checkAnswer() }}>{ props.option4 }</button>
        </div>
      </div>

    </div>
  )
}



export default GameScreen;