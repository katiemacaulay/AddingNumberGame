import React, { Component } from 'react';
import './App.css';
import StackGrid from "react-stack-grid";
import Button from '@material-ui/core/Button';

class WinMessage extends Component {
  state = {
      total: 0,
      winmsg: '',
      boxes: [],
      counter: 0,
      buttonSecondaryColors: ['#f0df94', '#e6b274', '#e0966c', '#d56c65', '#738b70', '#98b8ac'],
      startTotal: 0,
      buttonStatus: false,
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
    console.log(data[1].count)
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

  randomizeBoxTotals(){
    return Math.floor(Math.random() * 399 + 1)
  }
  randomizeButtoncolors(){
    return Math.floor(Math.random() * 6)
  }
  randomizeStartTotal(){
    return Math.floor(Math.random() * 2500 + 2500)
  }
  getNewNumbers(difficultyLevel){
    const boxes = []
    for (let index = 0; index < difficultyLevel; index++) {
      boxes.push({
        value: this.randomizeBoxTotals(),
        color: this.state.buttonSecondaryColors[this.randomizeButtoncolors()]
      })
    }
    this.setState({boxes, buttonStatus: false, winmsg: 'ready to play?', counter: 0, startTotal: this.randomizeStartTotal(), total: 0})
  }

  returnNumberBoxes(){
    const listItems = this.state.boxes.map((item) => {
      return <div key={item.value}>
        <Button className='button' 
          style={{background: item.color,
          height: (item.value * 2)  + 'px'}} 
          disabled={this.state.buttonStatus}
          onClick={() => this.addToTotal(item.value)}>
          {item.value}
        </Button>
      </div>
    });
    return listItems
  }
  componentDidMount() {
    this.getNewNumbers(12)
  }

  addNumberBox(){
    const newBox = {
      value: this.randomizeBoxTotals(),
      color: this.state.buttonSecondaryColors[this.randomizeButtoncolors()]
    }
    this.setState({boxes: [...this.state.boxes, newBox],
      counter: (this.state.counter + 1)})
  }


  render() {
    return (
      <div>
        <Button onClick={() => this.addNumberBox()}>Get another number</Button>
        <Button onClick={() => this.getNewNumbers(12)}>Easy</Button>
        <StackGrid columnWidth={150}>
          {this.returnNumberBoxes()}
        </StackGrid>
      </div>
    );
  }
}

export default WinMessage;

