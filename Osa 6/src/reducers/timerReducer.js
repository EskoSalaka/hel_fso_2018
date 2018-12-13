const reducer = (store = null, action) => {
  if (action.type === 'SETTIMER') {
    return action.timer
  }

  return store
}

export const setTimer = timer => {
  return { type: 'SETTIMER', timer }
}

export default reducer
