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
      data: [],
      gameImage: '',
      answer: '',
      option1: '',
      option2: '',
      option3: '',
      option4: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
  }

  componentDidMount() {
    this.checkUsername();

  }

  // axios.get(`https://api.rawg.io/api/games/4200/screenshots?key=${API_KEY}`)


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


  generateQuestion = () => {
    let pageNum = Math.floor(Math.random() * 61);
    let resultNum = Math.floor(Math.random() * 20);
    axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${pageNum}&ordering=-metacritic`)
    .then((games) => {
      let imageCount = games.data.results[resultNum].short_screenshots.length;
      let randomImageIndex = Math.floor(Math.random() * imageCount);

      this.setState({
        gameImage: games.data.results[resultNum].short_screenshots[randomImageIndex].image,
        answer: games.data.results[resultNum].name
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
      if (game.name !== this.state.answer) {
        otherGameTitles.push(game.name);
      }
    })

    let options = [];
    options.push(this.state.answer);
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
    console.log()
    if (event.target.innerText === this.state.answer) {
      this.setState({
        currentScore: (this.state.currentScore + 100)
      })
    } else {
      this.setState({
        currentScore: (this.state.currentScore - 100)
      })
    }

    this.generateQuestion();
  }


  render() {
    return (
      <>
        <StartScreen handleChange={this.handleChange} beginGame={this.beginGame} />
        <GameScreen checkAnswer={this.checkAnswer} gameImage={this.state.gameImage} option1={this.state.option1} option2={this.state.option2} option3={this.state.option3} option4={this.state.option4} />
      </>
    )
  }
}

root.render(<App />);