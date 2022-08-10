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
      username: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.checkUsername();
    // axios.get(`https://api.rawg.io/api/games/12020/screenshots?key=${API_KEY}`)
    // .then((asdf) => {
    //   console.log(asdf);
    // })
    // .catch((err) => {
    //   console.log(err);
    // })
  }

  // axios.get(`https://api.rawg.io/api/games/4200/screenshots?key=${API_KEY}`)


  handleChange = (event) => {
    let value = event.target.value;
    this.setState({
      [event.target.name]: value
      }, () => { this.checkUsername(this.state.username) }
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
  }


  render() {
    return (
      <>
        <StartScreen handleChange={this.handleChange} beginGame={this.beginGame} />
        <GameScreen />
      </>
    )
  }
}

root.render(<App />);