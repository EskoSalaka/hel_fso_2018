const counterReducer = (state = { good: 0, ok: 0, bad: 0 }, action) => {
  switch (action.type) {
    case 'GOOD':
      return { good: state.good + 1, ok: state.ok, bad: state.bad };
    case 'OK':
      return { good: state.good, ok: state.ok + 1, bad: state.bad };
    case 'BAD':
      return { good: state.good, ok: state.ok, bad: state.bad + 1 };
    case 'ZERO':
      return {
        good: 0,
        ok: 0,
        bad: 0
      };
    default:
      return { good: state.good, ok: state.ok, bad: state.bad };
  }
};

export default counterReducer;
