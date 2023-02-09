import './App.css';
import React from 'react'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      arrowAngle: 100,
      canvas: '',
      ctx: '',
      boyX: 100,
      boyY: 180,
      arrowSpeed: 15,
      keys: [],

    }
    this.arrowInterval = '';

  }
  componentDidMount(){
    document.onkeydown = (event)=>{
      console.log(event.keyCode)
      this.setState(function(state){
        console.log(state.keys)
        let keys = state.keys
        if(!keys.includes(event.keyCode)){

          keys.push(event.keyCode)
        }

        return{
          keys: keys,
        }
      })
    }
  }
  startGame() {
    console.log('start');
    // let randomNumber = Math.floor(Math.random() * 100);
    // let i = 0;
    this.arrowInterval = setInterval( () =>{
      // i = i + 10;
      // console.log(i)
      this.setState(function(state){

        return{
          arrowAngle: state.arrowAngle-state.arrowSpeed,
          arrowSpeed: state.arrowSpeed-15/200,

        }
      } )
    }, 10);
    setTimeout(() =>{
      console.log(123)
        clearInterval(this.arrowInterval)
    }, 2000)
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
    let boyImg = document.getElementById('boy')
    boyImg.style.transform = "translate(" + this.state.boyX +'px,'+ this.state.boyY + "px)";
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
        <form id='gameForm' action="">
          <div className="maze">
          <canvas>

          </canvas>
          <img onLoad={()=>this.imageLoaded()} id='maze' src="kidmaze-01.svg" alt="" />

          </div>
          <img id='boy' src="boy.png" alt="" />
        </form>
      </div>
    )
  }


}



export default App;


// поставить героя на лабиринт. нарисовать декорации для лабиринта
