import React from 'react';

export default ({Side, Name})=> {
    return (
      <div className={`char-name-${Side}`}>
       {Name.toUpperCase()} 
      </div>
    )  
}