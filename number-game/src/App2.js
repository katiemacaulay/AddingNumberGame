import React, { Component } from 'react';
import './App.css';
import StackGrid from "react-stack-grid";
import Button from '@material-ui/core/Button';
import RadioButton from './components/RadioButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import LevelButton from './components/Level'


class App extends Component {
  state = {
      total: 0,
      winmsg: '',
      difficultyLevel: 16,
      boxes: [],
      counter: 0,
      buttonBrightColors: ['#26c6da', '#7e57c2', '#9ccc65', '#ff7043', '#d4e157', '#5c6bc0', '#ef5350'],
      buttonSecondaryColors: ['#f0df94', '#e6b274', '#e0966c', '#d56c65', '#738b70', '#98b8ac'],
      startTotal: 0,
      buttonStatus: false,
      level: '3',
    }
  
  addToTotal(num){
    let total = this.state.total + num
    let winmsg = ''
    let startTotal = this.state.startTotal
    let counter= this.state.counter + 1
    let buttonStatus = false
    if(total < startTotal){
      winmsg =  'keep going!'
    }else if(total === startTotal){
      this.saveData(counter, true)
      winmsg =  'you win!'
      counter = 0
    }else if(total > startTotal){
      this.saveData(counter, false)
      buttonStatus = true
      winmsg = 'you went over! Try again!'
      total = 0
      counter = 0
    }
    this.setState({winmsg: winmsg, total: total, 
      counter: counter, buttonStatus: buttonStatus})
  }
  saveData(count, isWin) {
    let data = JSON.parse(localStorage.getItem('data') || "[]")
    data.push({count, isWin})
    localStorage.setItem('data', JSON.stringify(data))
  }
  renderSavedData() {
    let data = JSON.parse(localStorage.getItem('data') || "[]")
    return data.map((item) => {
      return <li>{item.count} | {item.isWin.toString()}</li>
    })
  }
  sortTopWinning(data){
    for(let i = 0; i < data.length; i++) {
      let turnsMade = data.count
      if(turnsMade > turnsMade[(i+1)]){
        let temp = turnsMade
        turnsMade = turnsMade[(i+1)]
        turnsMade[i + 1] = temp
      }
    }
  }
  getRandomNumber(max) {
    const randomNumber = Math.floor(Math.random() * max)
    const same = this.boxes.filter(x => x.value == randomizeNumber)
    if (same.length > 0) {
      return this.getRandomNumber(max)
    }
  }
  randomizeBoxTotals(level){
    if(level === '1'){
      return this.getRandomNumber(399 + 1)
    } else if(level === '2'){
      return this.getRandomNumber(199 + 1)
    } else if(level === '3'){
      return this.getRandomNumber(19 + 1) 
    }
  }
  randomizeButtoncolors(){
    return Math.floor(Math.random() * 6)
  }
  randomizeStartTotal(level){
    if(level === '1'){
      return this.randomizeNumbers(2500 + 2500)
    } else if(level === '2'){
      return this.randomizeNumbers(1000 + 1000)
    } else if(level === '3'){
      return this.randomizeNumbers(75 + 50)
    }
  }
  randomizeNumbers(num){
    return Math.floor(Math.random() * num)
  }
  checkForDupes(num){
    let boxNumbersArray = this.state.boxes
    return boxNumbersArray.filter(item => item == num).length === 1)
  }

  getNewNumbers(difficultyLevel){
    this.boxes = []
    for (let index = 0; index < difficultyLevel; index++) {
      this.boxes.push({
        value: this.randomizeBoxTotals(this.state.level),
        color: this.state.buttonBrightColors[this.randomizeButtoncolors()]
      })
    }
    this.setState({
      boxes: this.boxes,
      buttonStatus: false,
      winmsg: 'ready to play?',
      counter: 0, 
      startTotal: this.randomizeStartTotal(this.state.level), total: 0
    })
  }

  returnNumberBoxes(){
    const listItems = this.state.boxes.map((item) => {
      if(this.state.level === '3'){
        return <div key={item.value}>
          <Button className='button' 
            style={{background: item.color,
            height: item.value + 'px'}} 
            disabled={this.state.buttonStatus}
            onClick={() => this.addToTotal(item.value)}>
            {item.value}
          </Button>
        </div>
      } else {
        return <div key={item.value}>
          <Button className='button' 
            style={{background: item.color,
            height: item.value + 'px'}} 
            disabled={this.state.buttonStatus}
            onClick={() => this.addToTotal(item.value)}>
            {item.value}
          </Button>
        </div>
      }
    });
    return listItems
  }
  componentDidMount() {
    this.getNewNumbers(12)
  }

  addNumberBox(){
    const newBox = {
      value: this.randomizeBoxTotals(this.state.level),
      color: this.state.buttonBrightColors[this.randomizeButtoncolors()]
    }
    this.setState({boxes: [...this.state.boxes, newBox],
      counter: (this.state.counter + 1)})
  }
  handleDifficulty(difficultyLevel) {
    this.setState({difficultyLevel})
  }
  handleLevel(level) {
    this.setState({level})
  }

  render() {
    console.log(this.state.boxes)
    return (
      <div>
        <AppBar>
          <Toolbar>
            <div class='pl4'> Start a New Game! 
            <Button
            onClick={() => this.getNewNumbers(this.state.difficultyLevel)}>
            New Game</Button>
            </div>
          </Toolbar>
        </AppBar>
        <div className='gamePlay'>
          <LevelButton informParent={(e) => this.handleLevel(e)}/>
          <RadioButton informParent={(e) => this.handleDifficulty(e)}/>
            <ul>
              <li> goal: {this.state.startTotal} </li>
              <li> total: {this.state.total} </li>
              <li> turn: {this.state.counter} </li>
              <li> {this.state.winmsg} </li>
              <Button onClick={() => this.addNumberBox()}>Get another number</Button>
            </ul>
        </div>
        <StackGrid columnWidth={150}>
          {this.returnNumberBoxes()}
        </StackGrid>
        <div>
          {/* <ul>
            {this.renderSavedData()}
          </ul> */}
        </div>
      </div>
    );
  }
}

export default App;

