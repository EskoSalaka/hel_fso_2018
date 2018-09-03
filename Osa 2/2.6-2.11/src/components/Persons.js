import React from "react";

const Persons = ({ persons, nameFilter }) => {
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
            .map(person => <Person key={person.name} person={person} />)}
        </tbody>
      </table>
    </div>
  );
};

const Person = ({ person }) => {
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
    </tr>
  );
};

export default Persons;
