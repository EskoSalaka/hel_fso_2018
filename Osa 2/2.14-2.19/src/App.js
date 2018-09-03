import React from "react";
import personsService from "./services/persons";
import AddPersonForm from "./components/AddPersonForm";
import Persons from "./components/Persons";
import FilterForm from "./components/FilterForm";
import ErrorNotification from "./components/ErrorNotification";
import SuccessNotification from "./components/SuccessNotification";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      newName: "",
      newNumber: "",
      nameFilter: "",
      errorMessage: null,
      successMessage: null
    };

    this.addPerson = this.addPerson.bind(this);
    this.onTextFieldChange = this.onTextFieldChange.bind(this);
    this.deletePerson = this.deletePerson.bind(this);
  }

  componentDidMount() {
    personsService.getAllPersons().then(persons => {
      this.setState({ persons });
    });
  }

  onTextFieldChange(event) {
    event.preventDefault();

    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }

  addPerson = event => {
    event.preventDefault();

    const newPerson = {
      name: this.state.newName,
      number: this.state.newNumber
    };

    if (!newPerson.name) {
      /*pass*/
    } else if (!this.state.persons.map(p => p.name).includes(newPerson.name)) {
      personsService.addNewPerson(newPerson).then(newPerson => {
        this.setState(prevState => ({
          persons: [...prevState.persons, newPerson],
          newName: "",
          newNumber: "",
          successMessage: `Henkilö '${newPerson.name}' lisätty onnistuneesti`
        }));
      });

      setTimeout(() => {
        this.setState({ successMessage: null });
      }, 5000);
    } else if (this.state.persons.map(p => p.name).includes(newPerson.name)) {
      if (
        window.confirm(
          newPerson.name + " on jo luettelossa. Korvataanko vanha numero?"
        )
      ) {
        let pid = this.state.persons.find(p => p.name === newPerson.name).id;

        personsService
          .updatePerson(pid, newPerson)
          .then(updatedPerson => {
            let pcopy = JSON.parse(JSON.stringify(this.state.persons));
            pcopy[
              this.state.persons.findIndex(p => p.name === updatedPerson.name)
            ].number = updatedPerson.number;

            this.setState({
              persons: pcopy,
              successMessage: `Henkilö '${
                newPerson.name
              }' muokattu onnistuneesti`
            });

            setTimeout(() => {
              this.setState({ successMessage: null });
            }, 5000);
          })
          .catch(error => {
            this.setState({
              persons: this.state.persons.filter(person => person.id !== pid),
              errorMessage: `Muokattavaa henkilöä '${
                newPerson.name
              }' ei löydy enää tietokannasta!`
            });

            setTimeout(() => {
              this.setState({ errorMessage: null });
            }, 5000);
          });
      }
    }
  };

  deletePerson = event => {
    event.preventDefault();
    const personIdInt = parseInt(event.target.id, 10);
    const personName = this.state.persons.find(p => p.id === personIdInt).name;

    if (window.confirm("Poistetaanko varmasti henkilö " + personName + "?")) {
      personsService.deletePerson(event.target.id).then(newPerson => {
        this.setState({
          successMessage: `Henkilö '${personName}' poistettu onnistuneesti`,
          persons: this.state.persons.filter(
            person => person.id !== personIdInt
          )
        });

        setTimeout(() => {
          this.setState({ successMessage: null });
        }, 5000);
      });
    }
  };

  render() {
    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <ErrorNotification errorMessage={this.state.errorMessage} />
        <SuccessNotification successMessage={this.state.successMessage} />
        <AddPersonForm
          onSubmit={this.addPerson}
          numVal={this.state.newNumber}
          nameVal={this.state.newName}
          onTextFieldChange={this.onTextFieldChange}
        />
        <FilterForm
          onTextFieldChange={this.onTextFieldChange}
          nameFilterVal={this.state.nameFilter}
        />
        <Persons
          persons={this.state.persons}
          nameFilter={this.state.nameFilter}
          onDeleteButtonPressed={this.deletePerson}
        />
      </div>
    );
  }
}

export default App;
