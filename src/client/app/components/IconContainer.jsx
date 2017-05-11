import React from 'react'
import CharIcon from './CharIcon.jsx'
export default ({characters, side, row, playerState}) => {
  
  const rowOfCharacters = characters.filter( (character) =>{
    return character.side === side && character.row === row
  }).map((character) => {
    return <CharIcon character={character} playerState={playerState} />
  });

  return(
      <div className ={`char-container ${side}-side-char row-${row}-char`} > 
        {rowOfCharacters}
      </div>
  )
}