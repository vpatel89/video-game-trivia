import React from "react";
import { createRoot } from "react-dom/client";
const axios = require('axios');
const root = createRoot(document.getElementById("root"));

import { API_KEY } from './config/config.js';
import StartScreen from './components/StartScreen.jsx';
import GameScreen from './components/GameScreen.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      currentScore: 0,
      highScores: [],
      timer: 60,
      gameImage: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      pageN: 0,
      indexN: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
  }


  componentDidMount() {
    this.checkUsername();
    this.getLeaderboard();
  }


  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.timer !== this.state.timer && this.state.timer === 0) {
      clearInterval(this.countDown);
      this.outOfTime();
      this.uploadScore();
      this.resetGame();
      this.openLeaderboard();
    }
  }


  outOfTime = () => {
    alert('time is up!');
    document.getElementsByClassName("game")[0].style.display = 'none';
    document.getElementsByClassName("start")[0].style.display = 'block';
  }


  uploadScore = () => {
    var newScore = {
      "username": this.state.username,
      "score": this.state.currentScore
    };

    axios.post('/leaderboard', newScore)
    .then(() => {
      this.getLeaderboard();
    })
    .catch((err) => {
      console.log(err);
    })
  }


  resetGame = () => {
    this.setState({
      currentScore: 0,
      timer: 60,
      gameImage: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      pageN: 0,
      indexN: 0
    })
  }


  handleChange = (event) => {
    let value = event.target.value;
    this.setState({
      [event.target.name]: value
      }, () => { this.checkUsername() }
    );
  }


  checkUsername = () => {
    if (this.state.username === '') {
      document.getElementById("startButton").disabled = true;
    } else {
      document.getElementById("startButton").disabled = false;
    }
  }


  beginGame = () => {
    document.getElementsByClassName("start")[0].style.display = 'none';
    document.getElementsByClassName("game")[0].style.display = 'block';
    this.generateQuestion();
  }


  startTimer = () => {
    this.countDown = setInterval(() => {
      this.setState({
        timer: (this.state.timer - 1)
      })
    }, 1000)
  }


  stopTimer = () => {
    clearInterval(this.countDown);
  }


  fmtMSS(s) {
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s
  }


  generateQuestion = () => {
    let pageNum = Math.floor(Math.random() * 61);
    let resultNum = Math.floor(Math.random() * 20);
    axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${pageNum}&ordering=-metacritic`)
    .then((games) => {
      let imageCount = games.data.results[resultNum].short_screenshots.length;
      let randomImageIndex = Math.floor(Math.random() * imageCount);

      this.setState({
        gameImage: games.data.results[resultNum].short_screenshots[randomImageIndex].image,
        pageN: pageNum,
        indexN: resultNum
        }, () => { this.setOptions(games.data.results) }
      );
    })
    .catch((err) => {
      console.log(err);
    })
  }


  setOptions = (gamesList) => {
    let otherGameTitles = [];
    gamesList.forEach((game) => {
      if (game.name !== gamesList[this.state.indexN].name) {
        otherGameTitles.push(game.name);
      }
    })

    let options = [];
    options.push(gamesList[this.state.indexN].name);
    while (options.length < 4) {
      let randomIndex = Math.floor(Math.random() * otherGameTitles.length);
      options.push(otherGameTitles[randomIndex]);
      otherGameTitles.splice(randomIndex, 1);
    }

    for (let i = options.length - 1; i > 0; i--) {
      let randomInd = Math.floor(Math.random() * (i + 1));
      let temp = options[i];
      options[i] = options[randomInd];
      options[randomInd] = temp;
    }

    this.setState({
      option1: options[0],
      option2: options[1],
      option3: options[2],
      option4: options[3]
    });
  }


  checkAnswer = () => {
    this.stopTimer();
    let selectedGameName = event.target.innerText;
    axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${this.state.pageN}&ordering=-metacritic`)
    .then((games) => {
      if (selectedGameName === games.data.results[this.state.indexN].name) {
        this.setState({
        currentScore: (this.state.currentScore + 100)
      })
      } else {
        this.setState({
          currentScore: (this.state.currentScore - 100)
        })
      }
      this.generateQuestion();
    })
    .catch((err) => {
      console.log(err);
    })
  }


  getLeaderboard = () => {
    axios.get('/leaderboard')
    .then((stats) => {
      this.setState({
        highScores: stats.data
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }


  openLeaderboard = () => {
    var popup = document.getElementById("popup");
    popup.classList.add("open-popup");
  }


  hideLeaderboard = () => {
    var popup = document.getElementById("popup");
    popup.classList.remove("open-popup");
  }


  render() {
    return (
      <>
        <StartScreen handleChange={this.handleChange} beginGame={this.beginGame} openLeaderboard={this.openLeaderboard} hideLeaderboard={this.hideLeaderboard} highScores={this.state.highScores} />

        <GameScreen checkAnswer={this.checkAnswer} gameImage={this.state.gameImage} option1={this.state.option1} option2={this.state.option2} option3={this.state.option3} option4={this.state.option4} currentScore={this.state.currentScore} timer={this.fmtMSS(this.state.timer)} getLeaderboard={this.getLeaderboard} startTimer={this.startTimer} />
      </>
    )
  }
}

root.render(<App />);