// Assets //
import React from 'react';
import './Checkbox.css';

// Types //
type Props = {
  name: string;
  isChecked: boolean;
  toggleCheckMark: any;
};

const Checkbox: React.FC<Props> = (props) => {

  // Render //
  return (
    <div className="checkboxContainer">
      <label className="checkboxLabel">
        {props.name}
      </label>
      <input
        className="checkbox"
        type="checkbox"
        data-testid={`${props.name}-checkbox`}
        name={props.name}
        checked={props.isChecked}
        onChange={() => props.toggleCheckMark(props.name)}
      />
  </div>
  )
};


export default Checkbox;
