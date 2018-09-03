import React from "react";

const CountryFilter = ({ targetName, onTextFieldChange }) => {
  return (
    <div>
      <label>
        Find countries:
        <input
          value={targetName}
          onChange={e => onTextFieldChange(e.target.value)}
        />
      </label>
    </div>
  );
};

export default CountryFilter;
