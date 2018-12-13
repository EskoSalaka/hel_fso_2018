const reducer = (
  store = { message: 'No new notifications', timer: null },
  action
) => {
  if (action.type === 'SETNOTIFICATION') {
    if (store.timer) {
      clearTimeout(store.timer)
    }
    return { message: action.message, timer: action.timer }
  }
  if (action.type === 'RESETNOTIFICATION') {
    if (store.timer) {
      clearTimeout(store.timer)
    }
    return { message: 'No new notifications', timer: null }
  }

  return store
}

export const resetNotification = () => {
  return async dispatch => {
    dispatch({
      type: 'RESETNOTIFICATION'
    })
  }
}

export const notify = (note, time) => {
  return async dispatch => {
    let t = setTimeout(() => {
      dispatch({ type: 'RESETNOTIFICATION' })
    }, 1000 * time)

    dispatch({ type: 'SETNOTIFICATION', message: note, timer: t })
  }
}

export default reducer
