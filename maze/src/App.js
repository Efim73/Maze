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
      ghostStyle: {
        left: 180,
        top: 100,
      },
      arrowSpeed: 15,
      keys: [],
      ghostKeys: [],
      time: 1200,
      timeDisplay: '',
      spendTimeDisplay: '',
      menuClass: '',
      catcher: 'ghost',
      endFormClass: '',
      spendTime: 0,
      gameForm: "activeGameForm",


    }
    this.arrowInterval = '';
    this.gameInterval = '';

    // Нужно чтобы в функции animate  можно было использовать this.state
    this.animate = this.animate.bind(this);
    this.time = this.time.bind(this);

  }
  time() {
    this.setState(function(state){
      let boyStyle = state.boyStyle;
      let ghostStyle = state.ghostStyle;
      let endFormClass = state.endFormClass;
      let catcher = state.catcher;
      let gameForm = state.gameForm;  
      // console.log(this.state.spendTime);
      if(Math.abs(boyStyle.left-ghostStyle.left)<25 && Math.abs(boyStyle.top-ghostStyle.top)<25){

        clearInterval(this.gameInterval);
        endFormClass = 'endFormVisible'  
        gameForm = 'gameForm';

      }
      // let time = state.time;
      // setInterval(()=>{
      //   time = time -1
      // },1000)
      if(state.time===0){
        clearInterval(this.gameInterval);
        catcher = catcher === 'boy'? 'ghost' : 'boy';
        endFormClass = 'endFormVisible'  

      }
      let minutes = Math.floor(state.time/600)
      let seconds = Math.floor((state.time - minutes*600)/10)
      let ms = state.time%10


      let spendTime = state.spendTime;
      spendTime = spendTime+1;
      let spendMinutes = Math.floor(spendTime/600)
      let spendSeconds = Math.floor((spendTime - spendMinutes*600)/10)
      let spendMs = spendTime%10

      return{

        spendTime: spendTime,
        catcher: catcher,
        endFormClass: endFormClass,
        time: state.time-1,
        timeDisplay: minutes+':'+seconds+':'+ms,
        spendTimeDisplay:  spendMinutes+':'+spendSeconds+':'+spendMs,
        gameForm: gameForm,
      }
    })
  }
  animate(){
    // console.log(456)
    if(this.state.ghostKeys.length>0){
      this.setState(function(state){
        let ctx = state.ctx;

        let ghostStyle = state.ghostStyle;
        let ghostKeys = state.ghostKeys;
        console.log(ghostKeys.length)

        let ghost = document.getElementById('ghost')
        // let middleColor = ctx.getImageData(ghostStyle.left+15, ghostStyle.top+25, 1, 1).data[3];
        if(ghostKeys.includes(39)){
          ghostStyle.left = ghostStyle.left + 1
          if(ctx.getImageData(ghostStyle.left+ghost.offsetWidth, ghostStyle.top, 1, ghost.offsetHeight).data.includes(255)){
          ghostStyle.left = ghostStyle.left - 1;
          }
        }
        if(ghostKeys.includes(37)){
          ghostStyle.left = ghostStyle.left - 1
          if(ctx.getImageData( ghostStyle.left, ghostStyle.top, 1, ghost.offsetHeight).data.includes(255)){
            ghostStyle.left = ghostStyle.left + 1;
  
            }
        }
        if(ghostKeys.includes(38)){
          ghostStyle.top = ghostStyle.top - 1
          if(ctx.getImageData(ghostStyle.left, ghostStyle.top, ghost.offsetWidth, 1).data.includes(255)){
            ghostStyle.top = ghostStyle.top + 1;
  
            }
        }
        if(ghostKeys.includes(40)){
          ghostStyle.top = ghostStyle.top + 1
          if(ctx.getImageData(  ghostStyle.left ,ghostStyle.top+ghost.offsetHeight,  ghost.offsetWidth, 1).data.includes(255)){
            ghostStyle.top = ghostStyle.top - 5;
  
            }
        }
        return{ 
          ghostStyle: ghostStyle,
        }
      })
    }
    if(this.state.keys.length>0){
      this.setState(function(state){
        let ctx = state.ctx;

        let boyStyle = state.boyStyle;
        let keys = state.keys;
        let boy = document.getElementById('boy')
        // let middleColor = ctx.getImageData(boyStyle.left+15, boyStyle.top+25, 1, 1).data[3];
        if(keys.includes(68)){

          boyStyle.left = boyStyle.left + 1
          console.log()
          // console.log(ctx.getImageData(boyStyle.left+30, boyStyle.top, 1, 1).data[3]);
          if(ctx.getImageData(boyStyle.left+boy.offsetWidth, boyStyle.top, 1, boy.offsetHeight).data.includes(255)){
          boyStyle.left = boyStyle.left - 1;

          }
        }
        if(keys.includes(65)){
          boyStyle.left = boyStyle.left - 1
          if(ctx.getImageData( boyStyle.left, boyStyle.top, 1, boy.offsetHeight).data.includes(255)){
            boyStyle.left = boyStyle.left + 1;
  
            }
        }
        if(keys.includes(87)){
          boyStyle.top = boyStyle.top - 1
          if(ctx.getImageData(boyStyle.left, boyStyle.top, boy.offsetWidth, 1).data.includes(255)){
            console.log(ctx.getImageData(boyStyle.left, boyStyle.top, boyStyle.left+boy.offsetWidth, 1).data.includes(255))
            boyStyle.top = boyStyle.top + 1;
  
            }
        }
        if(keys.includes(83)){
          boyStyle.top = boyStyle.top + 1
          if(ctx.getImageData(  boyStyle.left ,boyStyle.top+boy.offsetHeight,  boy.offsetWidth, 1).data.includes(255)){
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
    this.gameInterval = setInterval(this.time ,100)
    document.onkeydown = (event) => {
      console.log(event.keyCode)
      this.setState(function (state) {

        console.log(state.keys)
        let keys = state.keys
        let ghostKeys = state.ghostKeys
        if(!ghostKeys.includes(event.keyCode)){
          ghostKeys.push(event.keyCode)
        }
        if (!keys.includes(event.keyCode)) {

          keys.push(event.keyCode)

        }
        return {
          keys: keys,
          ghostKeys: ghostKeys,

        }
      })
    }
    document.onkeyup = (event)=>{
      this.setState(function(state){
        let keys = state.keys;
        let ghostKeys = state.ghostKeys
        if(keys.includes(event.keyCode)){
          // с помощью indexOf находим индекс кнопки
          // С помощью  splice  находим 1 кнопку по ее индексу т удаляем из массива
          keys.splice(keys.indexOf(event.keyCode), 1)
        }
        if(ghostKeys.includes(event.keyCode)){
          ghostKeys.splice(ghostKeys.indexOf(event.keyCode),1)
        }
        return{
          ghostKeys: ghostKeys,
          keys: keys,
        }
      })
    }
    // зачем передавать this.animate
    setInterval(this.animate, 10)
  }
  startGame() {
    console.log('start');
    let plusArrowAngle = Math.random()*50;
    let arrowAngle = this.state.arrowAngle;
    this.arrowInterval = setInterval(() => {
      this.setState(function (state) {

        return {
          arrowAngle: arrowAngle - state.arrowSpeed,
          arrowSpeed: state.arrowSpeed - 15 / 200,


        }
      })
    }, 10);
    setTimeout(() => {
      console.log(123)
      clearInterval(this.arrowInterval)
      let catcher;
      let angle = Math.abs(this.state.arrowAngle)
      if((angle - Math.floor(angle / 360) * 360 ) > 180){
        catcher = 'ghost'
      }
      else{
        catcher = 'boy'
      }
      console.log(catcher, angle - Math.floor(angle / 360) * 360 );
      this.setState(function(state){


        return{
          // gameForm: "activeGameForm",
          // menuClass: 'menuHidden',
        }
      })

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
    ctx.drawImage(img, 0, 0, window.innerHeight, window.innerHeight)
  }
  newGame(){

  }
  render() {
    const arrowStyle = {
      transform: "translate(-50%, -50% ) rotate(" + this.state.arrowAngle + "deg)",
    }
    const boyStyle = {
      left: this.state.boyStyle.left+'px',
      top: this.state.boyStyle.top+'px',

    }
    const ghostStyle = {
      left: this.state.ghostStyle.left+'px',
      top: this.state.ghostStyle.top+'px'

    }




    return (
      <div id='game' >
        <form id='menu' className={this.state.menuClass} action="">
          <h1>Old House</h1>
          <img className='boy' src="boy.png" alt="" />
          <div className="wheel">
            <img style={arrowStyle} className='arrow' src="arrow.png" alt="" />
          </div>
          <img className='ghost' src="ghost.png" alt="" />
          <button type='button' className='start' onClick={(e) => this.startGame()}>Start!</button>
        </form>
        <form id={this.state.gameForm} action="">
          <div className="maze">
            <div className="time">
              <h2>Time</h2>
              <h3>{this.state.timeDisplay}</h3>
            </div>
            <canvas>

            </canvas>
            <img onLoad={() => this.imageLoaded()} id='maze' src="kidmaze.png" alt="" />
            <img id='boy' src="boy.png" alt="" style={boyStyle}/>
            <img id='ghost' src="ghost.png" alt="" style={ghostStyle}/>



          </div>
        </form>
        <form className={this.state.endFormClass} id='endForm' action="" onSubmit={(e) => this.newGame()}>
          <h2>You won</h2>
          <h3>Your time {this.state.spendTimeDisplay}</h3>
          <img src={this.state.catcher+'.png'} alt="" />
          <button className='newGame' >New Game</button>
        </form>
      </div>
    )
  }


}



export default App;


// Стилт для endForm 
// при нажатии на newgame прятать endform