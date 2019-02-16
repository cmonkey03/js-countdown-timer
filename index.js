// FIRST EXAMPLE PROJECT

function countdown(endDate) {
  let days, hours, minutes, seconds;

  endDate = new Date(endDate).getTime();

  if (isNaN(endDate)) {
	return;
  }

  setInterval(calculate, 1000);

  function calculate() {
    let startDate = new Date();
    startDate = startDate.getTime();

    let timeRemaining = parseInt((endDate - startDate) / 1000);

    if (timeRemaining >= 0) {
      days = parseInt(timeRemaining / 86400);
      timeRemaining = (timeRemaining % 86400);

      hours = parseInt(timeRemaining / 3600);
      timeRemaining = (timeRemaining % 3600);

      minutes = parseInt(timeRemaining / 60);
      timeRemaining = (timeRemaining % 60);

      seconds = parseInt(timeRemaining);

      document.getElementById("days").innerHTML = parseInt(days, 10);
      document.getElementById("hours").innerHTML = ("0" + hours).slice(-2);
      document.getElementById("minutes").innerHTML = ("0" + minutes).slice(-2);
      document.getElementById("seconds").innerHTML = ("0" + seconds).slice(-2);
    } else {
      return;
    }
  }
}

(function () {
  countdown('04/01/2019 05:00:00 PM');
}());


// SECOND EXAMPLE PROJECT
//
// const countDownClock = (number = 100, format = 'seconds') => {
//
//   const d = document;
//   const daysElement = d.querySelector('.days');
//   const hoursElement = d.querySelector('.hours');
//   const minutesElement = d.querySelector('.minutes');
//   const secondsElement = d.querySelector('.seconds');
//   let countdown;
//   convertFormat(format);
//
//
//   function convertFormat(format) {
//     switch(format) {
//       case 'seconds':
//         return timer(number);
//       case 'minutes':
//         return timer(number * 60);
//         case 'hours':
//         return timer(number * 60 * 60);
//       case 'days':
//         return timer(number * 60 * 60 * 24);
//     }
//   }
//
//   function timer(seconds) {
//     const now = Date.now();
//     const then = now + seconds * 1000;
//
//     countdown = setInterval(() => {
//       const secondsLeft = Math.round((then - Date.now()) / 1000);
//
//       if(secondsLeft <= 0) {
//         clearInterval(countdown);
//         return;
//       };
//
//       displayTimeLeft(secondsLeft);
//
//     },1000);
//   }
//
//   function displayTimeLeft(seconds) {
//     daysElement.textContent = Math.floor(seconds / 86400);
//     hoursElement.textContent = Math.floor((seconds % 86400) / 3600);
//     minutesElement.textContent = Math.floor((seconds % 86400) % 3600 / 60);
//     secondsElement.textContent = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;
//   }
// }


/*
  start countdown
  enter number and format
  days, hours, minutes or seconds
*/
// countDownClock(20, 'days');
