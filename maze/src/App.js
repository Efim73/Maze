import './App.css';
import React from 'react'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {



    }
  }
  startGame(){
    console.log('start');
    setInterval(function () {

    }, 1000);

    
  }
  
  render() {
    const  arrowStyle = {
      transform: "translate(-50%, -50% ) rotate(45deg)",
    }




    return (
      <div id='game' >
        <form action="">
          <h1>Old House</h1>
          <img className='boy' src="boy.png" alt="" />
          <div className="wheel">
            <img style={arrowStyle} className='arrow' src="arrow.png" alt="" />
          </div>
          <img className='ghost' src="ghost.png" alt="" />
          <button type='button' className='start' onClick={(e) => this.startGame()}>Start!</button>
        </form>
      </div>
    )
  }


}



export default App;


// по нажатию на старт запускается интервал. Он выводит в консоли 10 20 30.. через рандомное кол-во секунд этот интервал должен остановиться 