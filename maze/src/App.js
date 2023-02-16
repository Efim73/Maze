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
      boyStyle: {
        left: 100,
        top: 100,
      },
      arrowSpeed: 15,
      keys: [],
      time: 59,

    }
    this.arrowInterval = '';
    // Нужно чтобы в функции animate  можно было использовать this.state
    this.animate = this.animate.bind(this);

  }
  time() {
    this.setState(function(state){
      let time = state.time;
      setInterval(()=>{
        time = time -1
      },1000)
      return{
        time: state.time
      }
    })
  }
  animate(){
    // console.log(456)

    if(this.state.keys.length>0){
      this.setState(function(state){
        let ctx = state.ctx;

        let boyStyle = state.boyStyle;
        let keys = state.keys;
        let middleColor = ctx.getImageData(boyStyle.left+15, boyStyle.top+25, 1, 1).data[3];
        if(keys.includes(68)){

          boyStyle.left = boyStyle.left + 1
          // console.log(ctx.getImageData(boyStyle.left+30, boyStyle.top, 1, 1).data[3]);
          if(ctx.getImageData(boyStyle.left+30, boyStyle.top, 1, 1).data[3]>0 || middleColor>0){
          boyStyle.left = boyStyle.left - 1;

          }
        }
        if(keys.includes(65)){
          boyStyle.left = boyStyle.left - 1
          if(ctx.getImageData(boyStyle.left, boyStyle.top, 1, 1).data[3]>0 || middleColor>0){
            boyStyle.left = boyStyle.left + 1;
  
            }
        }
        if(keys.includes(87)){
          boyStyle.top = boyStyle.top - 1
          if(ctx.getImageData(boyStyle.left+30, boyStyle.top, 1, 1).data[3]>0 || middleColor>0){
            boyStyle.top = boyStyle.top + 1;
  
            }
        }
        if(keys.includes(83)){
          boyStyle.top = boyStyle.top + 1
          if(ctx.getImageData(boyStyle.left+30, boyStyle.top+50, 1, 1).data[3]>0 || middleColor>0){
            boyStyle.top = boyStyle.top - 1;
  
            }
        }
        // boyStyle.left = boyStyle.left + 1;  
        return{ 
          boyStyle: boyStyle,
        }
      })
    }
  }
  componentDidMount() {
    document.onkeydown = (event) => {
      console.log(event.keyCode)
      this.setState(function (state) {

        console.log(state.keys)
        let keys = state.keys
        if (!keys.includes(event.keyCode)) {

          keys.push(event.keyCode)
        }
        return {
          keys: keys,

        }
      })
    }
    document.onkeyup = (event)=>{
      this.setState(function(state){
        let keys = state.keys;
        if(keys.includes(event.keyCode)){
          // с помощью indexOf находим индекс кнопки
          // С помощью  splice  находим 1 кнопку по ее индексу т удаляем из массива
          keys.splice(keys.indexOf(event.keyCode), 1)
        }
        return{
          keys: keys,
        }
      })
    }
    // зачем передавать this.animate
    setInterval(this.animate, 10)
  }
  startGame() {
    console.log('start');
    this.arrowInterval = setInterval(() => {
      this.setState(function (state) {

        return {
          arrowAngle: state.arrowAngle - state.arrowSpeed,
          arrowSpeed: state.arrowSpeed - 15 / 200,

        }
      })
    }, 10);
    setTimeout(() => {
      console.log(123)
      clearInterval(this.arrowInterval)
    }, 2000)
  }
  imageLoaded() {
    console.log(321)
    let canvas = document.getElementsByTagName('canvas')[0];
    let ctx = canvas.getContext('2d')
    let maze = document.getElementsByClassName('maze')[0];
    maze.style.width = window.innerHeight
    canvas.width = window.innerHeight
    canvas.height = window.innerHeight
    this.setState({
      canvas: canvas,
      ctx: ctx,
    })

    let img = document.getElementById('maze')
    ctx.drawImage(img, 0, 0)
  }
  render() {
    const arrowStyle = {
      transform: "translate(-50%, -50% ) rotate(" + this.state.arrowAngle + "deg)",
    }
    const boyStyle = {
      left: this.state.boyStyle.left+'px',
      top: this.state.boyStyle.top+'px',

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
            <div className="time">
              <h2>Time</h2>
              <h3>00 : 59</h3>
            </div>
            <canvas>

            </canvas>
            <img onLoad={() => this.imageLoaded()} id='maze' src="kidmaze-01.svg" alt="" />
            <img id='boy' src="boy.png" alt="" style={boyStyle}/>

          </div>
        </form>
      </div>
    )
  }


}



export default App;


// Сделать управление мальчиком