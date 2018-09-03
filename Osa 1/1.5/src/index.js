import React from "react";
import ReactDOM from "react-dom";

const Otsikko = props => {
  return (
    <div>
      <h1>{props.kurssi}</h1>
    </div>
  );
};

const Osa = props => {
  return (
    <div>
      <p>
        {props.osa.nimi} {props.osa.tehtavia}
      </p>
    </div>
  );
};

const Sisalto = props => {
  return <div>{props.osat.map(osa => <Osa osa={osa} />)}</div>;
};

const Yhteensa = props => {
  return (
    <div>
      <p>yhteensä {props.osat.reduce((a, b) => a + b.tehtavia, 0)} tehtävää</p>
    </div>
  );
};

const App = () => {
  const kurssi = {
    nimi: "Half Stack -sovelluskehitys",
    osat: [
      {
        nimi: "Reactin perusteet",
        tehtavia: 10
      },
      {
        nimi: "Tiedonvälitys propseilla",
        tehtavia: 7
      },
      {
        nimi: "Komponenttien tila",
        tehtavia: 14
      }
    ]
  };

  return (
    <div>
      <Otsikko kurssi={kurssi.nimi} />
      <Sisalto osat={kurssi.osat} />
      <Yhteensa osat={kurssi.osat} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
