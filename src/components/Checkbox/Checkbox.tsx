import React from 'react'

type Props = {
  name: string;
  isChecked: boolean;
  toggleCheckMark: any;
}

const CheckBox: React.FC<Props> = (props) => {
  return (
    <div>
      <label>{props.name}</label>
      <input 
        type="checkbox" 
        // name={`props ${i+1}`} 
        value={props.name} 
        checked={props.isChecked}
        onChange={props.toggleCheckMark}
      />
  </div>
  )
}


export default CheckBox