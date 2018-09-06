import React from 'react';
import ReactDOM from 'react-dom';

const DisplayAnecdote = props => {
  return (
    <div>
      <p>{props.anecdote}</p>
      <p>Voted {props.votes} times.</p>
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
      selected: 0,
      votes: Array.apply(null, Array(props.anecdotes.length)).map(
        Number.prototype.valueOf,
        0
      )
    };
  }

  selectRandom = () => {
    return () => {
      this.setState({
        selected: Math.floor(Math.random() * this.props.anecdotes.length)
      });
    };
  };

  incrListVal = (arr, ind) => {
    var newArr = arr.slice(0);
    newArr[ind] = newArr[ind] + 1;
    return newArr;
  };

  voteCurrent = () => {
    return () => {
      this.setState(prevState => ({
        votes: this.incrListVal(prevState.votes, this.state.selected)
      }));
    };
  };

  render() {
    return (
      <div>
        <DisplayAnecdote
          anecdote={this.props.anecdotes[this.state.selected]}
          votes={this.state.votes[this.state.selected]}
        />
        <Button onclick={this.voteCurrent()} title="Vote" />
        <Button onclick={this.selectRandom()} title="Random anecdote" />
      </div>
    );
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
