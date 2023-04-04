import './App.css';
import React from 'react'

class App extends React.Component {
  constructor(props) {

    super(props)
    this.state = {
      arrowAngle: 90,
      canvas: '',
      ctx: '',
      boyX: 100,
      boyY: 180,
      boyStyle: {
        left: 100,
        top: 100,
        filter: '',
      },
      ghostStyle: {
        left: 180,
        top: 100,
        filter: '',
      },
      arrowSpeed: 5,
      keys: [],
      ghostKeys: [],
      time: 1200,
      timeDisplay: '',
      spendTimeDisplay: '',
      menuClass: '',
      catcher: '',
      endFormClass: '',
      spendTime: 0,
      gameForm: "gameForm",

      boyClass: '',
      ghostClass: '',
    }
    this.arrowInterval = '';
    this.gameInterval = '';
    this.colorInterval = '';

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
    let boySpeed = 2;
    let ghostSpeed = 2;
    if(this.state.ghostKeys.length>0){
      this.setState(function(state){
        let ctx = state.ctx;

        let ghostStyle = state.ghostStyle;
        let ghostKeys = state.ghostKeys;
        console.log(ghostKeys.length)

        let ghost = document.getElementById('ghost')
        // let middleColor = ctx.getImageData(ghostStyle.left+15, ghostStyle.top+25, 1, 1).data[3];
        if(ghostKeys.includes(39)){
          ghostStyle.left = ghostStyle.left + ghostSpeed
          if(ctx.getImageData(ghostStyle.left+ghost.offsetWidth, ghostStyle.top, 1, ghost.offsetHeight).data.includes(255)){
          ghostStyle.left = ghostStyle.left - ghostSpeed;
          }
        }
        if(ghostKeys.includes(37)){
          ghostStyle.left = ghostStyle.left - ghostSpeed
          if(ctx.getImageData( ghostStyle.left, ghostStyle.top, 1, ghost.offsetHeight).data.includes(255)){
            ghostStyle.left = ghostStyle.left + ghostSpeed;
  
            }
        }
        if(ghostKeys.includes(38)){
          ghostStyle.top = ghostStyle.top - ghostSpeed
          if(ctx.getImageData(ghostStyle.left, ghostStyle.top, ghost.offsetWidth, 1).data.includes(255)){
            ghostStyle.top = ghostStyle.top + ghostSpeed;
  
            }
        }
        if(ghostKeys.includes(40)){
          ghostStyle.top = ghostStyle.top + ghostSpeed
          if(ctx.getImageData(  ghostStyle.left ,ghostStyle.top+ghost.offsetHeight,  ghost.offsetWidth, 1).data.includes(255)){
            ghostStyle.top = ghostStyle.top - ghostSpeed;
  
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

          boyStyle.left = boyStyle.left +boySpeed
          console.log()
          // console.log(ctx.getImageData(boyStyle.left+30, boyStyle.top, 1, 1).data[3]);
          if(ctx.getImageData(boyStyle.left+boy.offsetWidth, boyStyle.top, 1, boy.offsetHeight).data.includes(255)){
          boyStyle.left = boyStyle.left -boySpeed;

          }
        }
        if(keys.includes(65)){
          boyStyle.left = boyStyle.left -boySpeed
          if(ctx.getImageData( boyStyle.left, boyStyle.top, 1, boy.offsetHeight).data.includes(255)){
            boyStyle.left = boyStyle.left +boySpeed;
  
            }
        }
        if(keys.includes(87)){
          boyStyle.top = boyStyle.top -boySpeed
          if(ctx.getImageData(boyStyle.left, boyStyle.top, boy.offsetWidth, 1).data.includes(255)){
            console.log(ctx.getImageData(boyStyle.left, boyStyle.top, boyStyle.left+boy.offsetWidth, 1).data.includes(255))
            boyStyle.top = boyStyle.top +boySpeed;
  
            }
        }
        if(keys.includes(83)){
          boyStyle.top = boyStyle.top +boySpeed
          if(ctx.getImageData(  boyStyle.left ,boyStyle.top+boy.offsetHeight,  boy.offsetWidth, 1).data.includes(255)){
            boyStyle.top = boyStyle.top - boySpeed
  
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
    this.colorInterval = setInterval(()=>{
      // catcher.style.filter = "drop-shadow(0 0 10px green)";
      this.setState(function(state){
        let boyStyle = state.boyStyle;
        let ghostStyle = state.ghostStyle;
        if(state.catcher ==='boy'){

          boyStyle.filter = 'drop-shadow(0 0 10px green)'
        }
        else{
          ghostStyle.filter = 'drop-shadow(0 0 10px green)'

        }
        return{
          boyStyle: boyStyle,
          ghostStyle: ghostStyle,
        }
      })
      setTimeout(() => {
        // catcher.style.filter = "drop-shadow(0 0 10px 0)";
        this.setState(function(state){
          let boyStyle = state.boyStyle;
          let ghostStyle = state.ghostStyle;
          if(state.catcher ==='boy'){
  
            boyStyle.filter = 'drop-shadow(0 0 10px transparent)'
          }
          else{
            ghostStyle.filter = 'drop-shadow(0 0 10px transparent)'
  
          }
          return{
            boyStyle: boyStyle,
            ghostStyle: ghostStyle,
          }
        })


      },500)

    },1000)
  }
  startGame() {
    let randomTime = Math.random()*2900 + 100;
    console.log('start');
    let plusArrowAngle = Math.random()*50;
    this.arrowInterval = setInterval(() => {
      this.setState(function (state) {
        let arrowAngle = state.arrowAngle;
        let arrowSpeed = state.arrowSpeed
        let catcher = '';
        let ghostClass = ''
        let boyClass = ''

        if(arrowSpeed < 5){
          arrowSpeed = arrowSpeed - 0.01
        }
        if(arrowSpeed < 0.1){
          let angle = state.arrowAngle
          if((angle - Math.floor(angle / 360) * 360 ) < 180){
            catcher = 'ghost'

  
            ghostClass = 'selectedHero'
          }
          else{
            catcher = 'boy'
            boyClass = 'selectedHero'
          }

          let gameForm = state.gameForm

          console.log(catcher, angle - Math.floor(angle / 360) * 360 );
          clearInterval(this.arrowInterval)
          arrowSpeed = 5;
        }
        return {
          catcher: catcher,
          boyClass: boyClass,
          ghostClass: ghostClass,
          arrowSpeed: arrowSpeed,
          arrowAngle: arrowAngle + state.arrowSpeed,
          // arrowSpeed: state.arrowSpeed - 15 / 200,


        }
      },function(){

        console.log(this.state.catcher);
        if(this.state.catcher != ''){
          setTimeout(() => {
            this.setState({
              
              gameForm: 'activeGameForm',
              menuClass: 'menuHidden',
              
            })

          },4000)
        }
      })
    }, 10);
    setTimeout(() => {
      console.log(123)
      // clearInterval(this.arrowInterval)

      this.setState(function(state){


        return{
          arrowSpeed: state.arrowSpeed - 0.1,
          // gameForm: "activeGameForm",
          // menuClass: 'menuHidden',
        }
      })

    }, randomTime)
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
      filter: this.state.boyStyle.filter,

    }
    const ghostStyle = {
      left: this.state.ghostStyle.left+'px',
      top: this.state.ghostStyle.top+'px',
      filter: this.state.ghostStyle.filter,

    }




    return (
      <div id='game' >
        <form id='menu' className={this.state.menuClass} action="">
          <h1>Old House</h1>
          <img className={'boy '+ this.state.boyClass} src="boy.png" alt="" />
          <div className="wheel">
            <img style={arrowStyle} className='arrow' src="arrow.png" alt="" />
          </div>
          <img className={'ghost '+ this.state.ghostClass} src="ghost.png" alt="" />
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
          <h2 className='winner'>You won</h2>
          <h3 className='result'>Your time {this.state.spendTimeDisplay}</h3>
          <img src={this.state.catcher+'.png'} alt="" />
          <button className='newGame' >New Game</button>
        </form>
      </div>
    )
  }


}



export default App;


// если время вышло игровая форма должна прятаться
// стили для конечной заставки
// по нажатию на новую игру прятать конечную заставку и показывать первую заставку