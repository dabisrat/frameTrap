import React from 'react'
import ReactDOM from 'react-dom';
import IconContainer from './components/IconContainer.jsx';
import Characters from './store'
import CharName from './components/CharName.jsx'

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
    return (
      <div>
        <IconContainer 
          Characters={this.props.Characters} 
          Side='left'
          HelperFn = {{
            getPlayerState:this.getPlayerState, 
            setPlayerSelect: this.setPlayerSelect
          }}/> 
          <CharName Side='left' Name={this.state.leftName}/>
        <IconContainer 
          Characters={this.props.Characters} 
          Side='right'
          HelperFn = {{
            getPlayerState:this.getPlayerState, 
            setPlayerSelect: this.setPlayerSelect
          }}/>
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