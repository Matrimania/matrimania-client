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
        // value={props.name} 
        name={props.name}
        checked={props.isChecked}
        onChange={() => props.toggleCheckMark(props.name)}
      />
  </div>
  )
}


export default CheckBox