// Variables made using Day.js via CDN
var date = dayjs().format('dddd D, YYYY');
var currentTime = dayjs().format('hh:mmA');

// Changing text content of the currentDay ID element to the current date and time
$(`#currentDay`).text(`Today's date is ${date}, and the time at page refresh is ${currentTime}`);

