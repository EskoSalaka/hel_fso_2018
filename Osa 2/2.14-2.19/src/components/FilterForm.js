import React from "react";

const FilterForm = props => {
  return (
    <div>
      <h2>Rajaus</h2>

      <label>
        Rajaa näytettäviä:
        <input
          name="nameFilter"
          type="text"
          value={props.nameFilterVal}
          onChange={props.onTextFieldChange}
        />
      </label>
    </div>
  );
};

export default FilterForm;