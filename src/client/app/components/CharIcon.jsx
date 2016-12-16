import React from 'react';

export default class CharIcon extends React.Component {
  constructor(props){
    super(props)
    this.state = {
     player1Select:'',
     player2Select:''
    }
  }
  playerSelected() {
    const playerState = this.props.helperFn.getPlayerState()
    console.log(playerState)
    if (!playerState.player1) {
      this.setState({player1Select: 'player1Select'});
      this.props.helperFn.setPlayerSelect('player1', true)
      this.props.helperFn.setPlayerSelect('leftName', this.props.character.name)
    } else if (!playerState.player2) {
      this.setState({player2Select: 'player2Select'});
      this.props.helperFn.setPlayerSelect('player2', true)
      this.props.helperFn.setPlayerSelect('rightName', this.props.character.name)
      // move to the the data page
    } else {
      console.log("only two can tango")
    }
  }

  render() {  
    return (
      <div 
        className={`
          ${this.props.character.side}_char_container 
          ${this.state.player1Select} 
          ${this.state.player2Select}`} 
          onClick={this.playerSelected.bind(this)}>
        <img 
          className={`${this.props.character.side}_image ${this.props.character.name}`}
          src= {`styles/assets/img/char_icons/${this.props.character.name}.jpg`}/>          
      </div>
    )
  }
};
