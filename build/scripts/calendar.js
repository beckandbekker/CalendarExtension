var today = new Date();
var year = today.getYear();
var month = today.getMonth();

var calendar = C('calendar')[0];
var monthView = O('month-view');
var calendarType = 'M';

var calendarTypes = {
    'M': 'month-view',
    'L': 'list-view'
}

function updateCalendar() {
    /*
        get the correct month
        number the calendar
        get future events
        highlight current date
    */

    updateMonth();
    updateYear();
    numberCalendar();
}

function updateMonth() {
    O('month-label').innerHTML = MONTHS[month];
}

function updateYear() {
    O('year-label').innerHTML = year + 1900;
}

function numberCalendar() {
    
    var firstDayOfWeek = new Date (year + 1900, month, 1).getDay();
    var daysLast = new Date (year + 1900, month, 0).getDate();
    var daysThis = new Date (year + parseInt((month + 1) / 12) + 1900, (month + 1), 0).getDate();
    var dateToDisplay;

    var daySquares = C('day-square');

    for (var i = 0; i < 42; i++) {
        dateToDisplay = daySquares[i].children[0].innerHTML = i - firstDayOfWeek + 1;

        if (dateToDisplay <= 0) {
            dateToDisplay += daysLast;
            daySquares[i].classList.add('not-month');
        } else if (dateToDisplay > daysThis) {
            dateToDisplay -= daysThis;
            daySquares[i].classList.add('not-month');
        } else {
            daySquares[i].classList.remove('not-month');
        }

        daySquares[i].children[0].innerHTML = dateToDisplay;

    }

    O('last-week').classList.remove('hidden');
    if (O('last-sunday').classList.contains('not-month'))
        O('last-week').classList.add('hidden');

}


/***** SETTING UP CALENDAR *****/

updateCalendar();

/***** BUTTON ONCLICK FUNCTIONS *****/

O('previous-month').onclick = () => {
    if (month === 0) {
        month = 11;
        year--;
    } else month--;
    updateCalendar();
}

O('next-month').onclick = () => {
    if (month === 11) {
        month = 0;
        year ++;
    } else month++;
    updateCalendar();
}