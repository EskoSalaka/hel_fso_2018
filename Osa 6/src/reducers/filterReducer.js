const reducer = (store = '', action) => {
  if (action.type === 'SETFILTER') {
    return action.message
  }

  return store
}

export const setFilter = message => {
  return {
    type: 'SETFILTER',
    message
  }
}

export default reducer
