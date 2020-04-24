"use strict";

class Calendar {

    constructor() {

        this.test = "hello";

        this.today = new Date();
        this.year = this.today.getYear();
        this.month = this.today.getMonth();

        this.calendar = C('calendar')[0];
        this.monthView = O('month-view');
        this.calendarType = 'M';    

        this.calendarTypes = {
            'M': 'month-view',
            'L': 'list-view'
        }

        this.updateCalendar();

    }

    updateCalendar() {
        /*
            get the correct month
            number the calendar
            get future events
            highlight current date
        */

        this.updateMonth();
        this.updateYear();
        this.numberCalendar();
        this.updateEvents();
    }

    updateMonth() {
        O('month-label').innerHTML = MONTHS[this.month];
    }

    updateYear() {
        O('year-label').innerHTML = this.year + 1900;
    }

    numberCalendar() {
        
        var firstDayOfWeek = new Date (this.year + 1900, this.month, 1).getDay();
        var daysLast = new Date (this.year + 1900, this.month, 0).getDate();
        var daysThis = new Date (this.year + parseInt((this.month + 1) / 12) + 1900, (this.month + 1), 0).getDate();
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

    updateEvents() {
        
        this.parseEvents();

    }

    parseEvents() {

        var xhr = new XMLHttpRequest();
        xhr.open('GET', JSON_PATH, true);
        xhr.responseType = 'text';

        xhr.onload = () => {
            if (xhr.status === 200) {

                
                var teams = [];
                var events;

                JSON.parse(xhr.response).forEach( cl => {
                    events = [];

                    cl.assignments.forEach(assignment => {
                        events.push(new Assignment(assignment["assignment-name"], assignment["due-date"]))
                    });

                    teams.push(new Team(cl["class-name"], events));


                });

            }
        }

        xhr.send();
        
    }

    

}

var cal = new Calendar();

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