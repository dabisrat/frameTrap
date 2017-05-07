import React from 'react'
import ReactDOM from 'react-dom';
import IconContainer from './components/IconContainer.jsx';
import Characters from './store'
import CharName from './components/CharName.jsx'
import '../styles/frametrap.css'
console.log('it is defeniatly updating and recompiling')
class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      player1:false,
      player2:false,
      leftName:'',
      rightName:''
    }
    this.getPlayerState = this.getPlayerState.bind(this);
    this.setPlayerSelect = this.setPlayerSelect.bind(this);
  }

getPlayerState(){
return this.state
}

setPlayerSelect(player, value){
  console.log(player, value)
  this.setState({[player]: value })
}

  render(){
    const makeContainer = (side, row) => {
      return (
          <IconContainer 
          characters={this.props.Characters} 
          side={side}
          row={row}
          playerState = {{
            get:this.getPlayerState, 
            set: this.setPlayerSelect
          }}/> 
      )
    }

    return (
      <div className="Main">
        {makeContainer('left',1)}
        {makeContainer('left',2)}
        <CharName Side='left' Name={this.state.leftName}/>

        {makeContainer('right',1)}
        {makeContainer('right',2)}
        <CharName Side='right' Name={this.state.rightName}/> 
      </div>
    )
  }  
}


ReactDOM.render(<App Characters={Characters} />, document.getElementById('app'))

//        <app>
/*          |
 ___________|______________________
|<ICon> <charN> <charN>  <ICpon>  | 
|_________________________________|
   |                         |
   |                         |
   |                         |  
  <CharI>                 <CharI>





*/  