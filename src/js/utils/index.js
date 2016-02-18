export function makeHumanTime(serverTime) {
  let hours = Math.floor(serverTime);
  let minutes = Math.round((serverTime - hours)*60);
  hours = hours < 10 ? '0'+hours : hours;
  minutes = minutes < 10 ? '0'+minutes : minutes;
  return {hours, minutes};
}

export function makeMembershipsForReactSelect(memberships) {
  memberships.forEach(item => {
    if (item.user) {
      item._username = item.user.name
      item._user_id = item.user.id
    } else if (item.group) {
      item._username = item.group.name;
      item._user_id = item.group.id;
    }
  })

  return memberships
}


/**
 * show error message
 * @param  {string}   msg - message
 * @param  {Function}   callback - callback function for 'try again()'
 * @param  {Function}   dispatch - redux store.dispatch method
 * @param  {Function}   dispatch - redux store.getState method
 */
export function handleError(msg, callback, dispatch, getState) {
  let tryAgain = window.confirm(msg)

  if (tryAgain) {
    return callback(dispatch, getState)
  }
}
