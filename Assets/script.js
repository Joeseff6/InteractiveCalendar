// Variables made using Day.js via CDN
var date = dayjs().format('dddd D, YYYY');
var currentTime = dayjs().format('hh:mmA');
const timeForm = $(`[class='row']`);
const saveBtn = $(`[class='saveBtn']`)
var currentHour = parseInt(dayjs().format('H'));

// Changing text content of the currentDay ID element to the current date and time
$(`#currentDay`).text(`Today's date is ${date}, and the time is ${currentTime}`);

refreshTime()

function refreshTime() {
    setInterval(function() {
        currentTime = dayjs().format('hh:mmA');
        $(`#currentDay`).text(`Today's date is ${date}, and the time is ${currentTime}`)
    }, 1000)
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


var loggedEvents = [];

// Create blank array for logged events
for (let i = 0; i < 9; i++) {
    loggedEvents.push("")
}

// Retrieve stored events for data persistence on page refresh
getStoredEvents()



saveBtn.click(function(event) {
    // Grabs an index based on the save button's data-index number
    var buttonClicked = event.target
    var buttonIndex = buttonClicked.dataset.index
    $(`[data-index=${buttonIndex}]`).text(`Event Saved!`)
    changeSaveText()


    loggedEvents[buttonIndex] = $(`[data-row=${buttonIndex}]`).val();

    timeForm.submit(function(event) {
        event.preventDefault()
        storeEvent()
    })


    function storeEvent() {
        localStorage.setItem(`Logged Events`, JSON.stringify(loggedEvents));
    }

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


