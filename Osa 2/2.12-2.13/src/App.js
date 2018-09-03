import React from "react";
import axios from "axios";
import CountryView from "./components/CountryView";
import CountryFilter from "./components/CountryFilter";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      targetName: ""
    };

    this.setTargetName = this.setTargetName.bind(this);
  }

  componentDidMount() {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      this.setState({ countries: response.data });
    });
  }

  setTargetName(val) {
    this.setState({ targetName: val });
  }

  render() {
    return (
      <div>
        <h1>Country finder</h1>
        <CountryFilter
          targetName={this.state.targetName}
          onTextFieldChange={this.setTargetName}
        />
        <CountryView
          countries={this.state.countries}
          targetName={this.state.targetName}
          onCountryLineClick={this.setTargetName}
        />
      </div>
    );
  }
}

export default App;
