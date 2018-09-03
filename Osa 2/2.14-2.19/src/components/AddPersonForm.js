import React from "react";

const AddPersonForm = props => {
  return (
    <div>
      <h2>Lisää uusi henkilö/muokkaa olemassaolevia</h2>
      <form onSubmit={props.onSubmit}>
        <label>
          Nimi:
          <input
            name="newName"
            type="text"
            value={props.nameVal}
            onChange={props.onTextFieldChange}
          />
        </label>
        <br />
        <label>
          Numero:
          <input
            name="newNumber"
            type="text"
            value={props.numVal}
            onChange={props.onTextFieldChange}
          />
        </label>
        <br />
        <input type="submit" value="Tallenna" />
      </form>
    </div>
  );
};

export default AddPersonForm;