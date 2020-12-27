// Variables made using Day.js via CDN
var date = dayjs().format('MMMM D, YYYY');
var currentTime = dayjs().format('h:mmA');
var currentHour = parseInt(dayjs().format('H'));

// Other variables made for application using jQuery
const timeForm = $(`[class='row']`);
const saveBtn = $(`[class='saveBtn']`)
var loggedEvents = [];

// Create blank array for logged events
for (let i = 0; i < 9; i++) {
    loggedEvents.push("")
}

getStoredEvents()

// Function to rendor local storage for data persistence
function rendorStoredEvents() {
    for (let i = 0; i < 9; i++) {
        $(`[data-row=${i}]`).val(loggedEvents[i]);
    }
}

// Function to retrieve stored events upon page open
function getStoredEvents() {
    var storedEvents = JSON.parse(localStorage.getItem(`Logged Events`))
    if (storedEvents !== null) {
        loggedEvents = storedEvents
    }
    rendorStoredEvents()
}

// Changing text content to display current day and time
$(`#currentDay`).text(`Today's date is ${date}, and the time is ${currentTime}`);

refreshTime()

// Function to refresh time per second to update time live
function refreshTime() {
    setInterval(function() {
        currentTime = dayjs().format('h:mmA');
        $(`#currentDay`).text(`Today's date is ${date}, and the time is ${currentTime}`)
    }, 1000)
}

// For loop to change row color based on the current hour
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

// Add functionality for when the save button is clicked
saveBtn.click(function(event) {
    var buttonClicked = event.target
    var buttonIndex = buttonClicked.dataset.index
    // Grabs specific button based on data-index attr of button clicked
    $(`[data-index=${buttonIndex}]`).text(`Event Saved!`)
    changeSaveText()

    // Submits user value to store into local storage
    timeForm.submit(function(event) {
        // Assign user value the logged events array based on button clicked
        loggedEvents[buttonIndex] = $(`[data-row=${buttonIndex}]`).val();
        event.preventDefault()
        storeEvent()
    })

    // Function to store user values per submission
    function storeEvent() {
        localStorage.setItem(`Logged Events`, JSON.stringify(loggedEvents));
    }

    // Function to change the save button text upon click
    function changeSaveText() {
        var textTimer = 2;
        var textInterval = setInterval(function() {
            textTimer--
            if (textTimer === 0) {
                clearInterval(textInterval)
                $(`[data-index=${buttonIndex}]`).text(`Save Event`)
            }
        }, 1000)
    }
})