import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import counterReducer from './counterReducer';
const store = createStore(counterReducer);

const calcKa = state => {
  return (state.good - state.bad) / (state.good + state.ok + state.bad);
};

const calcPos = state => {
  return (100 * state.good) / (state.good + state.ok + state.bad);
};

const isIncremented = state => {
  if (state.good === 0 && state.ok === 0 && state.bad === 0) {
    return true;
  } else {
    return false;
  }
};

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

const Statistics = state => {
  state = state.state;

  return (
    <table>
      <tbody>
        <StatisticInt name="Hyvä" val={state.good} />
        <StatisticInt name="Neutraali" val={state.ok} />
        <StatisticInt name="Huono" val={state.bad} />
        <StatisticFloat name="Keskiarvo" val={calcKa(state)} />
        <StatisticPer name="Positiivisia" val={calcPos(state)} />
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
  resetStats = () => {};

  render() {
    return (
      <div>
        <Title teksti="Anna palautetta" />
        <Button
          onclick={e =>
            store.dispatch({
              type: 'GOOD'
            })
          }
          title="Hyvä"
        />
        <Button
          onclick={e =>
            store.dispatch({
              type: 'OK'
            })
          }
          title="Neutraali"
        />
        <Button
          onclick={e =>
            store.dispatch({
              type: 'BAD'
            })
          }
          title="Huono"
        />
        <Title teksti="Statistiikkaa" />

        {isIncremented(store.getState()) ? (
          <p>Ei yhtään palautetta annettu</p>
        ) : (
          <div>
            <Statistics state={store.getState()} />
            <Button
              onclick={e =>
                store.dispatch({
                  type: 'ZERO'
                })
              }
              title="Nollaa tilastot"
            />
          </div>
        )}
      </div>
    );
  }
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

renderApp();
store.subscribe(renderApp);
