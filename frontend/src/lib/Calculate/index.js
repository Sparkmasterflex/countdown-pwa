function Calculate(datetime, now) {
  var diff, days, hours, minutes, secs, seconds;

  diff = (datetime - now)/1000;
  days = Math.floor(diff/86400);
  diff = diff - (days*86400);
  hours = Math.floor(diff/3600);
  hours = hours < 10 ? `0${hours}` : hours;
  diff = diff - (hours*3600);
  minutes = Math.floor(diff/60);
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  diff = diff - (minutes*60);
  secs = Math.floor(diff)
  seconds = secs < 10 ? `0${secs}` : secs;

  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}

export default Calculate;
