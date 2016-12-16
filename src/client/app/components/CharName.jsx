import React from 'react';

export default ({Side, Name})=> {
    return (
      <div className={`${Side}SideName`}>
       {Name.toUpperCase()} 
      </div>
    )  
}