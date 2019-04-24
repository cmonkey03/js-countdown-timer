function CountdownTimer(endTime, the_div) {

  if (isNaN(endTime)) {
  	return;
  }

  setInterval(calculate, 1000);

  function calculate() {
		let days, hours, minutes, seconds;

		let timer = document.getElementById(the_div)

    // Get Unix timestamp
    let startTime = new Date().getTime();
    // Convert milliseconds to seconds to be
    // compatable with PHP timestamp
    startTime = parseInt(startTime / 1000)

    let timeRemaining = endTime - startTime;

    if (timeRemaining >= 0) {
      days = parseInt(timeRemaining / 86400);
      timeRemaining = (timeRemaining % 86400);

      hours = parseInt(timeRemaining / 3600);
      timeRemaining = (timeRemaining % 3600);

      minutes = parseInt(timeRemaining / 60);
      timeRemaining = (timeRemaining % 60);

      seconds = parseInt(timeRemaining);

      timer.innerHTML = 'Days:' + parseInt(days, 10) + ', ';
      timer.innerHTML += 'Hours:' + ("0" + hours).slice(-2) + ', ';
      timer.innerHTML += 'Minutes:' + ("0" + minutes).slice(-2) + ', ';
      timer.innerHTML += 'Seconds:' + ("0" + seconds).slice(-2);
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

function gf_timed_content_init (json_arg) {
	const args = JSON.parse(json_arg);
	// alert ('inside init with a target date: ' + args['target_date']);
}

function gf_timed_content_countdown(json_arg) {
	const args = JSON.parse(json_arg);
	const the_div = args['div_id']
	const endTime = parseInt(args.to_date)

	setTimeout(CountdownTimer(endTime, the_div), 3000)
}
