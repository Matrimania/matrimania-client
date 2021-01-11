import React, { useState } from 'react'

type Props = {
  name: string;
  toggleCheckMark: any;
}

const CheckBox: React.FC<Props> = (props) => {
  return (
    <div>
      <label>{props.name}</label>
      <input 
        type="checkbox" 
        name={`props ${i+1}`} 
        value={props.name} 
        onChange={() => props.toggleCheckMark(props.name)}
      />
  </div>
  )
}


export default CheckBox