const countdown  = dateEnd => {
  let days, hours, minutes, seconds;

  dateEnd = new Date(dateEnd).getTime();

  if (isNaN(dateEnd)) {
    return;
  }

  const calculate = () => {
    const now = new Date();
    let dateStart = new Date(now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds());
    let timeRemaining = parseInt((dateEnd - dateStart.getTime()) / 1000)

    if (timeRemaining >= 0) {
      days = parseInt(timeRemaining / 86400);
      timeRemaining = (timeRemaining % 86400);
      hours = parseInt(timeRemaining / 3600);
      timeRemaining = (timeRemaining % 3600);
      minutes = parseInt(timeRemaining / 60);
      timeRemaining = (timeRemaining % 60);
      seconds = parseInt(timeRemaining);

      document.getElementById('days').innerHTML = `${parseInt(days, 10)} dager`;
      document.getElementById('hours').innerHTML = `${('0' + hours).slice(-2)} timer`;
      document.getElementById('minutes').innerHTML = `${('0' + minutes).slice(-2)} minutt`;
      document.getElementById("date").innerText = `(${new Date(dateEnd).toDateString().slice(0, 10)})`
    }
  };

  setInterval(calculate, 1000);

  const display = (days, hours, minutes, seconds) => {
  }
};