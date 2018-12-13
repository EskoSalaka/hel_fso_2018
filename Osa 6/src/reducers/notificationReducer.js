const reducer = (store = 'No new notifications', action) => {
  if (action.type === 'SETNOTIFICATION') {
    return action.message
  }
  if (action.type === 'RESETNOTIFICATION') {
    return 'No new notifications'
  }

  return store
}

export const setNotification = message => {
  return { type: 'SETNOTIFICATION', message }
}
export const resetNotification = () => {
  return { type: 'RESETNOTIFICATION' }
}

export default reducer
