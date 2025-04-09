//const
const calendarOutput = document.getElementById('calendarOutput');
//form
const form = document.getElementById('eventForm');

//create a global var calendar
var calendar = null;
//create a global var calendarEvents
var calendarEvents = [];

loadCalendar(); //load the calendar on page load
loadEvents();   //load events from localStorage into calendar

//load calendar function
function loadCalendar() {
    calendar = new FullCalendar.Calendar(calendarOutput, {
        initialView: 'dayGridMonth'
        //different views can be added here
        //initialDate: '2023-10-01',  by default it will be the current date
        //initialView: 'dayGridMonth',
        //initialView: 'timeGridWeek',
        //initialView: 'timeGridDay',

    });
    calendar.render();

}
//click on calendar event listener and function to get information
calendar.on('eventClick', function (info) {
    console.log(info.event);
    //get the event object
    var event = info.event;
    //get the event title
    var title = event.title;
    //get the event description
    var description = event.extendedProps.description;
    //get the event start date
    var start = event.start;
    //get the event end date
    var end = event.end;
    //show the event details in the form
    document.getElementById('titleInput').value = title;
    document.getElementById('descriptionInput').innerHTML = description;
    document.getElementById('startDate').innerHTML = start;
    document.getElementById('endDate').innerHTML = end;

});

//get values from a form and add them to the calendar
function addEvent() {
    //prevent default form submission    
    //get the values from the form inputs
    var title = document.getElementById('titleInput').value;
    var start = document.getElementById('startDate').value;
    var end = document.getElementById('endDate').value;
    var description = document.getElementById('descriptionInput').value;

    //create a new event object
    var newEvent = {
        title: title,
        start: start,
        end: end,
        description: description
    };
    //add the event to the calendar view
    calendar.addEvent(newEvent);
    //add the event to the calendarEvents array for our records
    calendarEvents.push(newEvent);

    //save the events to localStorage
    saveEvents();

}

//save object event array to localStorage
function saveEvents() {
    if (calendarEvents.length > 0) {
        localStorage.setItem('calendarEvents', JSON.stringify(calendarEvents));
    }
}

function loadEvents() {
    if (localStorage.getItem('calendarEvents')) {
        calendarEvents = JSON.parse(localStorage.getItem('calendarEvents'));
        //loop through the events and add them to the calendar
        calendarEvents.forEach(event => {
            calendar.addEvent(event);
        });
    }
}