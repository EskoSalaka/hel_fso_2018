import React from "react";

const Kurssi = ({ kurssi }) => {
  return (
    <div>
      <Kurssiotsikko nimi={kurssi.nimi} />
      <Sisalto osat={kurssi.osat} />
      <Yhteensa osat={kurssi.osat} />
    </div>
  );
};

const Kurssiotsikko = ({ nimi }) => {
  return (
    <div>
      <h2>{nimi}</h2>
    </div>
  );
};

const Osa = ({ osa }) => {
  return (
    <div>
      <p>
        {osa.nimi} {osa.tehtavia}
      </p>
    </div>
  );
};

const Sisalto = ({ osat }) => {
  return <div>{osat.map(osa => <Osa key={osa.id} osa={osa} />)}</div>;
};

const Yhteensa = ({ osat }) => {
  return (
    <div>
      <p>Yhteensä {osat.reduce((a, b) => a + b.tehtavia, 0)} tehtävää</p>
    </div>
  );
};

export default Kurssi;
