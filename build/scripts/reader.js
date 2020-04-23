function tryRead() {
    // contains uncompleted and completed assignments. Don't care about completed
    // allAssignmentss SHOULD only have 1 element when loaded. Just in case, check
    var allAssignmentss = document.getElementsByClassName("all-up-body-container__35n0y assignments-list__2cZs1");

    if (allAssignmentss.length == 1) {
        var allAssignments = allAssignmentss[0];

        if (allAssignments.innerHTML.indexOf("Nothing left to turn in") != -1) {
            alert("No assignments!");

            return true;
        } else {
            // get the uncompleted assignments, first DIV in allAssignments
            var uncompleted = allAssignments.childNodes[0];
            var assignments = uncompleted.getElementsByClassName("assignment-card__1ClA-");
            
            if (assignments.length != 0) {
                read(assignments);
            }
        }

        return true;
    }

    return false;
}

function read(assignments) {
    alert(assignments.length + " assignments found");

    // loop through all the assignments here
    for (var i = 0; i < assignments.length; i++) {
        var hw = assignments[i];

        // there should only be one of each of these, but need to check just in case
        // list of elements that could contain the name of the assignment (length SHOULD be 1)
        var names = hw.getElementsByClassName("title__3Kp3L");
        // list of elements that could contain the due date of the assignment (length SHOULD be 1)
        var dueBoxes = hw.getElementsByClassName("due-date-alignment__1BKzK");

        // whether names has the name
        var hasName = false;
        // whether dueBoxes has the date
        var hasDate = false;

        // name and due date of the assignment
        var name, date;

        // if there's only 1 names, then (things make sense and) set the name
        if (names.length == 1) {
            hasName = true;

            name = names[0].innerHTML;
        }

        // if there's only 1 place where the due date could be
        if (dueBoxes.length == 1) {
            // there's 3 SPANs inside the "due box," only the last has the due date
            // the others are not visible and have other information
            var dues = dueBoxes[0].getElementsByTagName("SPAN");
            // loop through those spans
            for (var j = 0; j < dues.length; j++) {
                // only use the one with the due date
                if (dues[j].innerHTML.indexOf("Due") != 0) {
                    continue;
                }

                // due date
                var due = dues[j].innerHTML;
                // format of due is "Due MONTH DATE, YEAR HR:MN AM/PM"
                // OR "Due today/tomorrow at HR:MN AM/PM"
                due = due.replace("Due ", ""); // remove the "Due "
                due = due.replace(",", ""); // also remove the comma so its all seperated by spaces
                due = due.split(" "); // convert to an array, every element specifies part of the time
    
                try {
                    // deal with today/tomorrow first
                    if (due[0] == "today" || due[0] == "tomorrow") {
                        var date2 = new Date();

                        if (due[0] == "tomorrow") {
                            date2.setDate(date2.getDate() + 1); // automatically handles changing year and month
                        }

                        due[0] = MONTHS[date2.getMonth()]; // replace today/tomorrow
                        due[1] = date2.getDate(); // replace "at" with date
                        due.splice(2, 0, date2.getFullYear()); // put in an element in index 2 with the year
                        // at this point, due has the expected format
                    }

                    var month = MONTHS.indexOf(due[0]); // get the index of the month (0 = January, 11 = December)
                    var dt = due[1]; // get the date of the month its due on
                    var yr = due[2]; // get the year its due on
                    var hrmin = due[3].split(":"); // split HR:MN into [hr, min]
                    var ampm = due[4]; // either "AM" or "PM"
    
                    // default to just setting the hour to the hour mentioned in hr
                    var hr = Number(hrmin[0]);
                    // unless it says PM, in which case its 12 hours after (using military time here, JS likes that)
                    if (ampm == "PM") {
                        hr += 12;
                    }
                    // trivial
                    var min = Number(hrmin[1]);
    
                    date = new Date();
                    date.setMonth(month);
                    date.setDate(dt);
                    date.setFullYear(yr);
                    date.setHours(hr);
                    date.setMinutes(min);

                    // make sure everything was done correctly
                    if (date.toString() != "Invalid Date") {
                        hasDate = true;
                    }
                } catch {}

                continue;
            }
        }

        if (hasName && hasDate) {
            alert(name + " is due on " + date.toString());
        }
        if (hasName && !hasDate) {
            alert("Could not get date for " + name);
        }
        if (hasDate && !hasName) {
            alert("Could not get name for assignment due on " + date.toString());
        }
        if (!hasName && !hasDate) {
            alert("Could not get information for one homework");
        }
    }
}

// idk the order it loads the scripts in, so we keep waiting until dateConsts is loaded and therefore MONTHS is defined
var int = setInterval(function () {
    try {
        var m = MONTHS[0];

        clearTimeout(int);

        if (!tryRead()) {
            var int2 = setInterval(function () {
                if (tryRead()) {
                    clearInterval(int2);
                }
            }, 1000);
        }
    } catch {}
}, 20);
