export function makeHumanTime(serverTime) {
  let hours = Math.floor(serverTime);
  let minutes = Math.round((serverTime - hours)*60);
  hours = hours < 10 ? '0'+hours : hours;
  minutes = minutes < 10 ? '0'+minutes : minutes;
  return {hours, minutes};
}
