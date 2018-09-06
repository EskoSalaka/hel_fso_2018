import React from 'react';
import ReactDOM from 'react-dom';

const StatisticInt = props => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.val}</td>
    </tr>
  );
};

const StatisticFloat = props => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.val.toFixed(1)}</td>
    </tr>
  );
};

const StatisticPer = props => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>
        {props.val
          .toFixed(1)
          .toString()
          .concat(' %')}{' '}
      </td>
    </tr>
  );
};

const Statistics = props => {
  return (
    <table>
      <tbody>
        <StatisticInt name="Hyvä" val={props.stats.hyva} />
        <StatisticInt name="Neutraali" val={props.stats.neutraali} />
        <StatisticInt name="Huono" val={props.stats.huono} />
        <StatisticFloat name="Keskiarvo" val={props.stats.ka} />
        <StatisticPer name="Positiivisia" val={props.stats.pos} />
      </tbody>
    </table>
  );
};

const Title = props => {
  return (
    <div>
      <h1>{props.teksti}</h1>
    </div>
  );
};

const Button = props => {
  return <button onClick={props.onclick}>{props.title}</button>;
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0,
      ka: 0.0,
      pos: 0.0
    };
  }

  increment = stateVal => {
    return () => {
      this.setState(
        prevState => ({ [stateVal]: prevState[stateVal] + 1 }),
        () => this.calcStats()
      );
    };
  };

  isIncremented = () => {
    if (
      this.state.hyva === 0 &&
      this.state.neutraali === 0 &&
      this.state.huono === 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  calcStats = () => {
    this.setState({
      ka:
        (this.state.hyva - this.state.huono) /
        (this.state.hyva + this.state.neutraali + this.state.huono),
      pos:
        (100 * this.state.hyva) /
        (this.state.hyva + this.state.neutraali + this.state.huono)
    });
  };

  render() {
    return (
      <div>
        <Title teksti="Anna palautetta" />
        <Button onclick={this.increment('hyva')} title="Hyvä" />
        <Button onclick={this.increment('neutraali')} title="Neutraali" />
        <Button onclick={this.increment('huono')} title="Huono" />
        <Title teksti="Statistiikkaa" />

        {this.isIncremented() ? (
          <p>Ei yhtään palautetta annettu</p>
        ) : (
          <Statistics stats={this.state} />
        )}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
