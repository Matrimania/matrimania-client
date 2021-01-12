import React from 'react';
import './Checkbox.css';
import { BackButton, StyledButton, StyledCard } from '../App/styledComponents.styles'

type Props = {
  name: string;
  isChecked: boolean;
  toggleCheckMark: any;
}

const Checkbox: React.FC<Props> = (props) => {
  return (
    <div className="checkbox">
      <label>{props.name}</label>
      <input 
        type="checkbox" 
        name={props.name}
        checked={props.isChecked}
        onChange={() => props.toggleCheckMark(props.name)}
      />
  </div>
  )
}


export default Checkbox