import React from "react";

const Persons = ({ persons, nameFilter, onDeleteButtonPressed }) => {
  return (
    <div>
      <h2>Henkilöt</h2>
      <table>
        <tbody>
          {persons
            .filter(person => {
              if (nameFilter) {
                return person.name
                  .toLowerCase()
                  .includes(nameFilter.toLowerCase());
              } else {
                return true;
              }
            })
            .map(person => (
              <Person
                key={person.name}
                person={person}
                onDeleteButtonPressed={onDeleteButtonPressed}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

const Person = ({ person, onDeleteButtonPressed }) => {
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td>
        <button id={person.id} onClick={onDeleteButtonPressed}>
          {" "}
          Delete{" "}
        </button>{" "}
      </td>
    </tr>
  );
};

export default Persons;
