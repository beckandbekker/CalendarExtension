// "use strict";

class Calendar {

    constructor() {

        this.test = "hello";

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

    getJson() {

        var xhr = new XMLHttpRequest();
        xhr.open('GET', JSON_PATH, false);

        xhr.onload = () => {
            this.events = this.parseEvents(JSON.parse(xhr.responseText));
        };

        xhr.send();

    }

    parseEvents(jsonResult) {
    
        // declaring the dayOf variable
        var dayOf;
        var evs = {};

        // iterates through the objects for the classes in the JSON object
        jsonResult.forEach( cl => {

            // iterates through the assignments in each class
            cl.assignments.forEach( ev => {

                // getting the due date of ev as an array with the format '[year, month, date]'
                dayOf = new Date(ev["due-date"]);
                
                var evY = dayOf.getFullYear();
                var evM = dayOf.getMonth();
                var evD = dayOf.getDate();


                // adding year, date, and className if they do not exist in the evs object yet
                if (evs[`${evY}`] == undefined)
                    evs[`${evY}`] = [{},{},{},{},{},{},{},{},{},{},{},{}];
                if (evs[`${evY}`][evM][`${evD}`] == undefined)
                    evs[`${evY}`][evM][`${evD}`] = {};
                if (evs[`${evY}`][evM][`${evD}`][`${ev.className}`] == undefined)
                    evs[`${evY}`][evM][`${evD}`][`${cl["class-name"]}`] = [];

                // pushing the array of events to the proper array in evs
                evs[`${evY}`][evM][`${evD}`][`${cl["class-name"]}`].push(ev);

            });

        });
        
        return evs;
        
    }

    /***** UPDATE FUNCTIONS *****/

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

    updateMonth() {
        O('month-label').innerHTML = MONTHS[this.month];
    }

    updateYear() {
        O('year-label').innerHTML = this.year;
    }

    numberCalendar() {
        
        this.monthInfo.firstDayOfWeek = new Date (this.year, this.month, 1).getDay();
        this.monthInfo.daysLast = new Date (this.year, this.month, 0).getDate();
        this.monthInfo.daysThis = new Date (this.year + parseInt((this.month + 1) / 12), (this.month + 1), 0).getDate();
        var dateToDisplay;

        var daySquares = C('day-square');

        for (var i = 0; i < 42; i++) {
            dateToDisplay = daySquares[i].children[0].innerHTML = i - this.monthInfo.firstDayOfWeek + 1;

            if (dateToDisplay <= 0) {
                dateToDisplay += this.monthInfo.daysLast;
                daySquares[i].classList.add('not-month');
            } else if (dateToDisplay > this.monthInfo.daysThis) {
                dateToDisplay -= this.monthInfo.daysThis;
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

    highlightToday() {
        var days = C('day-square');
        if((this.month == this.today.getMonth()) && (this.year == this.today.getFullYear())) 
            days[this.today.getDate() + this.monthInfo.firstDayOfWeek - 1].classList.add('today');
        else
            for (var i = 0; i < days.length; i++)
                days[i].classList.remove('today');
    }

    updateEvents() {

        var daySquares = C('day-square');
        var monthEvents = this.events[`${this.year}`][this.month];
        var monthKeys = Object.keys(monthEvents);

        for (var i = 0; i < daySquares.length; i++) {
            daySquares[i].children[1].children[0].classList.add('hidden');
        }

        monthKeys.forEach( key => {

            var classes = Object.keys(monthEvents[`${key}`]);
            var date = parseInt(monthKeys)
            var dayContent = daySquares[this.monthInfo.firstDayOfWeek + date - 1].children[1];
            var contents = '';
            
            dayContent.children[0].classList.remove('hidden');

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

            dayContent.children[1].innerHTML = contents;

        });
        
    }

}

/***** BUTTON ONCLICK FUNCTIONS *****/

O('previous-month').onclick = () => {
    if (cal.month === 0) {
        cal.month = 11;
        cal.year--;
    } else cal.month--;
    cal.updateCalendar();
}

O('next-month').onclick = () => {
    if (cal.month === 11) {
        cal.month = 0;
        cal.year ++;
    } else cal.month++;
    cal.updateCalendar();
}

/***** RUNNING CALENDAR SCRIPTS *****/

var cal = new Calendar();
