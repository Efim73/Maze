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
          <img className='boy' src="boy.png" alt="" />
          <div className="wheel">
            <img className='arrow' src="arrow.png" alt="" />
          </div>
          <img className='ghost' src="ghost.png" alt="" />
          <button className='start'>Start!</button>
        </form>
      </div>
    )
  }


}



export default App;


