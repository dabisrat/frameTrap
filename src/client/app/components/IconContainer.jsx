import React from 'react'
import CharIcon from './CharIcon.jsx'
export default ({Characters, Side, HelperFn}) => {
  
  const row1Characters = Characters.filter( (character) =>{
    return character.side === Side && character.row === 1
  }).map((character) => {
    return <CharIcon character={character} helperFn={HelperFn} />
  });

  const row2Characters = Characters.filter( (character) =>{
    return character.side === Side && character.row === 2
  }).map((character) => {
    return <CharIcon character={character} helperFn={HelperFn}/>
  });

  return(
    <div className={`iconContainer${Side}`}> 
      <div className ={`row1`}> 
        {row1Characters}
      </div>
      <div className ={`row2`}> 
        {row2Characters}
      </div> 
    </div>
  )
}