// Variables made using Day.js via CDN
const date = dayjs().format('dddd D, YYYY');
const currentTime = dayjs().format('hh:mmA');
const timeForm = $(`[class='row']`);
const saveBtn = $(`[class='saveBtn']`)

dayjs.extend(objectSupport)


// Create blank array for logged events
for (let i = 0; i < 9; i++) {
    loggedEvents.push("")
}

// Retrieve stored events for data persistence on page refresh
getStoredEvents()

// Changing text content of the currentDay ID element to the current date and time
$(`#currentDay`).text(`Today's date is ${date}, and the time at page refresh is ${currentTime}`);


saveBtn.click(function(event) {
    // Grabs an index based on the save button's data-index number
    var buttonClicked = event.target
    var buttonIndex = buttonClicked.dataset.index

    loggedEvents[buttonIndex] = $(`[data-row=${buttonIndex}]`).val();

    timeForm.submit(function(event) {
        event.preventDefault()
        storeEvent()
    })


    function storeEvent() {
        localStorage.setItem(`Logged Events`, JSON.stringify(loggedEvents));
    }
})

function getStoredEvents() {
    var storedEvents = JSON.parse(localStorage.getItem(`Logged Events`))
    console.log(storedEvents)

    if (storedEvents !== null) {
        loggedEvents = storedEvents
    }

    rendorStoredEvents()

}

function rendorStoredEvents() {
    for (let i = 0; i < 9; i++) {
        $(`[data-row=${i}]`).val(loggedEvents[i]);
    }
}

dayjs.extend(objectSupport)