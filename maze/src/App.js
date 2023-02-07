import './App.css';
import React from 'react'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      arrowAngle: 100,
      canvas: '',
      ctx: '',

    }
    this.arrowInterval = '';

  }
  startGame() {
    console.log('start');
    // let randomNumber = Math.floor(Math.random() * 100);
    // let i = 0;
    this.arrowInterval = setInterval(function () {
      // i = i + 10;
      // console.log(i)
      this.setState(function(state){

        return{
          arrowAngle: state.arrowAngle+10,

        }
      } )
    }, 1000);
    setTimeout(function () {
      console.log(123)
        clearInterval(this.arrowInterval)
    }, 5000)
  }
  imageLoaded() {
    console.log(321)
    let canvas = document.getElementsByTagName('canvas')[0];
    let ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    this.setState({
      canvas: canvas,
      ctx: ctx,
    })
    let img = document.getElementById('maze')
    ctx.drawImage(img, 0,0)
  }
  render() {
    const arrowStyle = {
      transform: "translate(-50%, -50% ) rotate(" + this.state.arrowAngle + "deg)",
    }




    return (
      <div id='game' >
        <form id='menu' action="">
          <h1>Old House</h1>
          <img className='boy' src="boy.png" alt="" />
          <div className="wheel">
            <img style={arrowStyle} className='arrow' src="arrow.png" alt="" />
          </div>
          <img className='ghost' src="ghost.png" alt="" />
          <button type='button' className='start' onClick={(e) => this.startGame()}>Start!</button>
        </form>
        <form id='game' action="">
          <canvas>

          </canvas>
          <img onLoad={()=>this.imageLoaded()} id='maze' src="kidmaze-01.svg" alt="" />
        </form>
      </div>
    )
  }


}



export default App;


// поставить героя на лабиринт. нарисовать декорации для лабиринта