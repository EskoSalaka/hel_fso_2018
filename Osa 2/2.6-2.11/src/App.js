import React from 'react';
import axios from 'axios';
import AddPersonForm from './components/AddPersonForm';
import Persons from './components/Persons';
import FilterForm from './components/FilterForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      nameFilter: ''
    };

    this.addPerson = this.addPerson.bind(this);
    this.onTextFieldChange = this.onTextFieldChange.bind(this);
  }

  componentDidMount() {
    console.log('did mount');
    axios.get('http://localhost:3001/db').then(response => {
      console.log('promise fulfilled');
      this.setState({ persons: response.data.persons });
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
      this.setState(prevState => ({
        persons: [...prevState.persons, newPerson],
        newName: '',
        newNumber: ''
      }));
    } else {
      alert('Annettu henkilö löytyy jo luettelosta!');
    }
  };

  render() {
    return (
      <div>
        <h1>Puhelinluettelo</h1>
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
        />
      </div>
    );
  }
}

export default App;
