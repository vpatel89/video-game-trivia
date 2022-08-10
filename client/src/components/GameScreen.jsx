import React from 'react';

const GameScreen = (props) => {

  return (
    <div className='game'>
      <h1>Game is about to begin</h1>

      <div className='triviaSection'>
        <div id='timer'>Timer</div>
        <div id='score'>Score</div>

        <div className='imageDiv'>
          <img id='gameImage' src={ props.gameImage } alt="..." />
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