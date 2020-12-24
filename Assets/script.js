var date = dayjs().format('dddd D, YYYY');
console.log(date);
$(`#currentDay`).text(`Today's date is ${date}`);