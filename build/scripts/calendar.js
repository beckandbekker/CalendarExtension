// "use strict";

/**
 * Calendar class
 * @module Calendar
 */
class Calendar {

    /**
     * Create a new Calendar object
     */
    constructor() {

        
        this.today = new Date();
        this.year = this.today.getFullYear();
        this.month = this.today.getMonth();

        this.monthInfo = {
            firstDayOfWeek: new Date (this.year, this.month, 1).getDay(),
            daysLast: new Date (this.year, this.month, 0).getDate(),
            daysThis: new Date (this.year + parseInt((this.month + 1) / 12), (this.month + 1), 0).getDate()
        }

        this.calendar = C('calendar')[0];
        this.monthView = O('month-view');
        this.calendarType = 'M';
        this.events = {};
        
        this.getJson();
        this.updateCalendar();

    }

    /***** SET UP FUNCTIONS *****/

    /**
     * retrieve the class JSON's data, parse in to an object, and send it to this.parseEvents
     */
    getJson() {

        // create the new XMLHttpRequest
        var xhr = new XMLHttpRequest();

        // setting up the request
        xhr.open('GET', JSON_PATH, false);

        // when the JSON loads, parse it into an object and pass into this.parseEvents()
        xhr.onload = () => {
            this.events = this.parseEvents(JSON.parse(xhr.responseText));
        };

        // send the request
        xhr.send();

    }

    /**
     * Convert the class JSON object into this.events
     * @param {Object} jsonResult the class JSON parsed into an object
     */
    parseEvents(jsonResult) {
    
        // variable declaration
        var dayOf;
        var evs = {};

        // iterate through the objects for the classes in the JSON object
        jsonResult.forEach( cl => {

            // iterate through the assignments in each class
            cl.assignments.forEach( ev => {

                // get the due date of ev as an array with the format '[year, month, date]'
                dayOf = new Date(ev["due-date"]);
                
                var evY = dayOf.getFullYear();
                var evM = dayOf.getMonth();
                var evD = dayOf.getDate();


                // add year, date, and className if they do not exist in the evs object yet
                if (evs[`${evY}`] == undefined)
                    evs[`${evY}`] = [{},{},{},{},{},{},{},{},{},{},{},{}];
                if (evs[`${evY}`][evM][`${evD}`] == undefined)
                    evs[`${evY}`][evM][`${evD}`] = {};
                if (evs[`${evY}`][evM][`${evD}`][`${ev.className}`] == undefined)
                    evs[`${evY}`][evM][`${evD}`][`${cl["class-name"]}`] = [];

                // push the array of events to the proper array in evs
                evs[`${evY}`][evM][`${evD}`][`${cl["class-name"]}`].push(ev);

            });

        });
        
        return evs;
        
    }

    /***** UPDATE FUNCTIONS *****/

    /**
     * update the calendar for each month
     */
    updateCalendar() {
        /*
            get the correct month
            number the calendar
            get future events
            * show the events
            highlight current date
        */

        this.updateMonth();
        this.updateYear();
        this.numberCalendar();
        this.highlightToday();
        this.updateEvents();
    }

    /**
     * update div.calendar #month-label to the proper month
     */
    updateMonth() {
        O('month-label').innerHTML = MONTHS[this.month];
    }

    /**
     * update div.calendar #year-label to the proper year
     */
    updateYear() {
        O('year-label').innerHTML = this.year;
    }

    /**
     * update the numbering of the days (td.day-square p)
     * of the calendar to align with the calendar's month and year
     */
    numberCalendar() {
        
        // update this.monthInfo
        this.monthInfo.firstDayOfWeek = new Date (this.year, this.month, 1).getDay();
        this.monthInfo.daysLast = new Date (this.year, this.month, 0).getDate();
        this.monthInfo.daysThis = new Date (this.year + parseInt((this.month + 1) / 12), (this.month + 1), 0).getDate();
        
        // declare variable that will hold the day info
        var dateToDisplay;

        // get all of the day squares
        var daySquares = C('day-square');

        // loop through all of the day squares
        for (var i = 0; i < 42; i++) {

            // calculate the day with respect to the first of the month
            // not adjusted for month lengths (i.e. last month's dates are negative,
            // next month's dates start at [last day of this month] + 1)
            dateToDisplay = daySquares[i].children[0].innerHTML = i - this.monthInfo.firstDayOfWeek + 1;

            // adjust the date and day square if it is part of the previous month
            if (dateToDisplay <= 0) {
                dateToDisplay += this.monthInfo.daysLast;
                daySquares[i].classList.add('not-month');
            }
            
            // adjust the date and day square if it is part of the next month
            else if (dateToDisplay > this.monthInfo.daysThis) {
                dateToDisplay -= this.monthInfo.daysThis;
                daySquares[i].classList.add('not-month');
            }
            
            // make all other days have regular formatting
            else {
                daySquares[i].classList.remove('not-month');
            }

            // set dateToDisplay to be in the <p> tag of the proper daySquare
            daySquares[i].children[0].innerHTML = dateToDisplay;

        }

        // if the last week of the calendar is not needed, hide it
        if (O('last-sunday').classList.contains('not-month')) {
            O('last-week').classList.add('hidden');
        }

        // if the last week of the calendar is needed, show it
        else {
            O('last-week').classList.remove('hidden');
        }

    }

    /**
     * add '.today' class to the current date if the month and year 
     * of the calendar line up with the current month and year
     */
    highlightToday() {

        // find all day squares
        var days = C('day-square');

        // deletes all of the 
        for (var i = 0; i < days.length; i++)
            days[i].classList.remove('today');

        // if it is the correct month and year, highlights the today's date
        if((this.month == this.today.getMonth()) && (this.year == this.today.getFullYear())) 
            days[this.today.getDate() + this.monthInfo.firstDayOfWeek - 1].classList.add('today');
            
    }

    /**
     * 1. hide all of the exclamation icons in the calendar
     * 2. show all of the exclamation icons for days with assignments
     */
    updateEvents() {

        // find all day squares
        var daySquares = C('day-square');

        // find all events happening this month in this.events
        var monthEvents = this.events[`${this.year}`][this.month];

        // find all of the keys in monthEvents (string values for all dates with events)
        var monthKeys = Object.keys(monthEvents);

        // hides all of the exclamation icons
        for (var i = 0; i < daySquares.length; i++) {
            daySquares[i].children[1].children[0].classList.add('hidden');
        }

        // loops through each key/date
        monthKeys.forEach( key => {

            // get all classes happening on this date
            var classes = Object.keys(monthEvents[`${key}`]);

            // parse the date into an int
            var date = parseInt(monthKeys);

            // opens the .day-assignment-content of the dateSquare for the day
            var dayContent = daySquares[this.monthInfo.firstDayOfWeek + date - 1].children[1];

            // declares a variable to hold HTML
            var contents = '';
            
            // shows the exclamation icon for the date
            dayContent.children[0].classList.remove('hidden');

            // loops through each event and appends relevant data to contents
            classes.forEach( cl => {
                
                contents += `<h4>${cl}</h4>`;

                var assignments = monthEvents[`${key}`][`${cl}`];

                var assignmentsList = '';

                assignments.forEach( a => {

                    contents += `<li><p>${a["assignment-name"]} Due ${new Date(a["due-date"]).toLocaleString()}</p></li>`;

                });

                if (assignmentsList.length != 0)
                    contents += `<ul>${assignmentsList}</ul>`;

            });

            // adds contents to the html of dayContent
            dayContent.children[1].innerHTML = contents;

        });
        
    }

}

/***** BUTTON ONCLICK FUNCTIONS *****/

/**
 * when button#previous-month is clicked:
 * adjust month and year and call Calendar.updateCalendar()
 */
O('previous-month').onclick = () => {
    if (cal.month === 0) {
        cal.month = 11;
        cal.year--;
    } else cal.month--;
    cal.updateCalendar();
}

/**
 * when button#next-month is clicked:
 * adjust month and year and call Calendar.updateCalendar()
 */
O('next-month').onclick = () => {
    if (cal.month === 11) {
        cal.month = 0;
        cal.year ++;
    } else cal.month++;
    cal.updateCalendar();
}

/***** RUNNING CALENDAR SCRIPTS *****/

var cal = new Calendar();
