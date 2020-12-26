// Variables made using Day.js via CDN
const date = dayjs().format('dddd D, YYYY');
const currentTime = dayjs().format('hh:mmA');
const timeForm = $(`[class='row']`);
const saveBtn = $(`[class='saveBtn']`)
const currentHour = parseInt(dayjs().format('H'));


var loggedEvents = [];

// Create blank array for logged events
for (let i = 0; i < 9; i++) {
    loggedEvents.push("")
}


let iterator = 0
for (let i = 9; i < 18; i++) {
    if (i < currentHour) {
        $(`[data-row=${iterator}]`).addClass(`past`);
    } else if (i === currentHour){
        $(`[data-row=${iterator}]`).addClass(`present`);
    } else {
        $(`[data-row=${iterator}]`).addClass(`future`);
    }
    iterator++
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




console.log(currentHour)
