import React from "react";
import ReactDOM from "react-dom";
import Kurssi from './Components/Kurssi'

const Kurssit = ({ kurssit }) => {
  return (
    <div>
      {kurssit.map(kurssi => <Kurssi key={kurssi.id} kurssi={kurssi} />)}
    </div>
  );
};

const Sivuotsikko = ({ nimi }) => {
  return (
    <div>
      <h1>{nimi}</h1>
    </div>
  );
};

const App = () => {
  const kurssit = [
    {
      nimi: "Half Stack -sovelluskehitys",
      id: 1,
      osat: [
        {
          nimi: "Reactin perusteet",
          tehtavia: 10,
          id: 1
        },
        {
          nimi: "Tiedonvälitys propseilla",
          tehtavia: 7,
          id: 2
        },
        {
          nimi: "Komponenttien tila",
          tehtavia: 14,
          id: 3
        }
      ]
    },
    {
      nimi: "Node.js",
      id: 2,
      osat: [
        {
          nimi: "Routing",
          tehtavia: 3,
          id: 1
        },
        {
          nimi: "Middlewaret",
          tehtavia: 7,
          id: 2
        }
      ]
    }
  ];

  return (
    <div>
      <Sivuotsikko nimi="Opetusohjelma" />
      <Kurssit kurssit={kurssit} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
