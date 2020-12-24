
// Variables made using Day.js via CDN
var date = dayjs().format('dddd D, YYYY');
var currentTime = dayjs().format('hh:mmA');


$(`#currentDay`).text(`Today's date is ${date}, and the time at page refresh is ${currentTime}.`);