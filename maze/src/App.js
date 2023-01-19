import './App.css';
import React from 'react'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {



    }
  }
  
  render() {





    return (
      <div id='game' >
        <form action="">
          <h1>Old House</h1>
          <img src="boy.png" alt="" />
          <div className="wheel">
            <img src="arrow.png" alt="" />
          </div>
          <img src="ghost.png" alt="" />
          <button>Start!</button>
        </form>
      </div>
    )
  }


}



export default App;


