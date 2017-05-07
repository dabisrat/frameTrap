import React from 'react';
console.log(window.innerWidth, window.innerHeight)

export default class CharIcon extends React.Component {
  constructor(props){
    super(props)
    this.state = {
     player1Select:false,
     player2Select:false
    }
  }
  handleClick(e) {
    // when the user clicks on this component  a class should be applied
    // the top level state should be updated.
    const {player1, player2} = this.props.playerState.get()
    if (!player1) {
      this.setState({player1Select:true});
      this.props.playerState.set('player1', true)
      this.props.playerState.set('leftName', this.props.character.name)
    } else if (!player2) {
      this.setState({player2Select: true});
      this.props.playerState.set('player2', true)
      this.props.playerState.set('rightName', this.props.character.name)
      // move to the the data page
    } else {
      console.log("only two can tango")
    }
  }
  isSelected() {
    if (this.state.player1Select && this.state.player2Select) {
      return 'player-1-selected player-2-selected'
    }
    if (this.state.player1Select) {
      return 'player-1-selected'
    }
    if (this.state.player2Select) {
      return 'player-2-selected'
    }  
  }
  handleMouseEvent(e){
    let {player1,player2} = this.props.playerState.get();
    let mouseOver = (trueState, falseState) => e.type === 'mouseenter' ? this.setState(trueState) : this.setState(falseState);
    if (!player1) {
      return mouseOver({player1Select:true},{player1Select:false})
    }
    if (!player2) {
      return mouseOver({player2Select:true}, {player2Select:false})
    }
  }

  render() {  
    return (
      <div 
        className={`
          image-container
          ${this.props.character.name ==='null'? 
            'hidden' : this.props.character.side + '-image-container'
          }
          ${this.isSelected()}
          `} 
          onClick={this.handleClick.bind(this)}
          onMouseEnter={this.handleMouseEvent.bind(this)}
          onMouseLeave={this.handleMouseEvent.bind(this)}>
        <img 
          className={`
          char-image
          ${this.props.character.side}-image 
          ${this.props.character.name}`}
          //this path is realative to the index page or the bundel.js
          src= {`src/client/styles/assets/img/char_icons/${this.props.character.name}.jpg`}/>
      </div>
    )
  }
};
