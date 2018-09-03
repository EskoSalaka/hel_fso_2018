import React from "react";

const CountryView = ({ countries, targetName, onCountryLineClick }) => {
  const filteredCountries = countries.filter(country => {
    if (targetName) {
      return country.name.toLowerCase().includes(targetName.toLowerCase());
    } else {
      return true;
    }
  });

  if (filteredCountries.length === 0) {
    return (
      <div>
        <h3>No countries matching the given filter.</h3>
      </div>
    );
  } else if (filteredCountries.length === 1) {
    return (
      <div>
        <h2>
          {filteredCountries[0].name} {filteredCountries[0].nativeName}{" "}
        </h2>
        <p>Capital: {filteredCountries[0].capital} </p>
        <p>Population: {filteredCountries[0].population} </p>
        <img className="resize" src={filteredCountries[0].flag} alt="flag" />
      </div>
    );
  } else if (filteredCountries.length <= 10) {
    return (
      <div>
        <table>
          <tbody>
            {filteredCountries.map(country => (
              <CountryLine
                key={country.name}
                country={country}
                onCountryLineClick={onCountryLineClick}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div>
        <h3>Too many matches! Specify a more accurate filter.</h3>
      </div>
    );
  }
};

const CountryLine = ({ country, onCountryLineClick }) => {
  return (
    <tr>
      <td onClick={e => onCountryLineClick(country.name)}>{country.name}</td>
    </tr>
  );
};

export default CountryView;
