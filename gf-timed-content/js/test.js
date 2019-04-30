// gf_timed_content_init & gf_timed_content_countdown
// are called by gf_timed_content.php

function gf_timed_content_init (json_arg) {
  const args = JSON.parse(json_arg);
  // alert ('inside init with a target date: ' + args['target_date']);
}

function gf_timed_content_countdown(json_arg) {
  const args = JSON.parse(json_arg);
  const the_div = args['div_id']

  // The endTime is a 10-digit Unix timestamp
  const endTime = parseInt(args.to_date)

  setTimeout(() => CountdownTimer(endTime, the_div), 3000)
}

function CountdownTimer(endTime, the_div) {

  if (isNaN(endTime)) {
    return;
  }

  // CALCULATE TIME REMAINING
  // Get Unix timestamp
  let startTime = new Date().getTime();
  // Convert milliseconds to seconds to be
  // compatable with PHP timestamp
  startTime = parseInt(startTime / 1000)
  let timeRemaining = endTime - startTime;

  // BUILD HTML ELEMENTS
  let timer = document.getElementById(the_div)
  let countdownSection = document.createElement('section')
  const times = ['days', 'hours', 'minutes', 'seconds']

  countdownSection.id = 'countdown-container'
  countdownSection.className = 'countdown-container'

  times.forEach((unit) => {
    let parentDiv = document.createElement('div')
    parentDiv.className = unit + '-container'

    let countDiv = document.createElement('div')
    countDiv.id = unit
    countDiv.className = unit

    let labelDiv = document.createElement('div')
    labelDiv.className = unit + '-label'

    const labelText = unit[0].toUpperCase() + unit.substring(1)
    let labelTextNode = document.createTextNode(labelText)

    labelDiv.appendChild(labelTextNode)
    parentDiv.appendChild(countDiv)
    parentDiv.appendChild(labelDiv)
    countdownSection.appendChild(parentDiv)
  })

  timer.appendChild(countdownSection)

  // setInterval(calculate, 1000);

  let dayDiv = document.getElementById('days')
  let hourDiv = document.getElementById('hours')
  let minuteDiv = document.getElementById('minutes')
  let secondsDiv = document.getElementById('seconds')

  function calculate() {
    let days, hours, minutes, seconds;

    if (timeRemaining >= 0) {
      days = parseInt(timeRemaining / 86400);
      timeRemaining = (timeRemaining % 86400);

      hours = parseInt(timeRemaining / 3600);
      timeRemaining = (timeRemaining % 3600);

      minutes = parseInt(timeRemaining / 60);
      timeRemaining = (timeRemaining % 60);

      seconds = parseInt(timeRemaining);

      dayDiv.innerHTML = parseInt(days, 10) + ', ';
      hourDiv.innerHTML += ("0" + hours).slice(-2) + ', ';
      minuteDiv.innerHTML += ("0" + minutes).slice(-2) + ', ';
      secondsDiv.innerHTML += ("0" + seconds).slice(-2);

      return;
    } else {
      //Remove countdown timer
      // var countdownContainer = document.getElementById('countdown-container')
      // countdownContainer.innerHTML = ""

      //Display hours, minutes and seconds into video
      // titleBar.innerHTML = "Time into video play"

      return;
    }
  }
}
