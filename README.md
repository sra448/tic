## TIC
### simple date library

`tic` is really only a bunch of functions for handling js dates. Instead of wrapping the traditional date object or even extending its prototype, `tic` aims to help you deal with the real thing, the good old javascript date object.

### Features:

**tic.equals(date1, date2, precision*)**
since `date1 == date2` checks for the identity instead of the value

**tic.format(date, format*)**
all the things you'd come to expect from a format function

**tic.parse(str, format*)**
the opposite of format is parse. use all the formatrules from format

**tic.add(date, amount, unit*)**
units are: `second(s)`, `minute(s)`, `hour(s)`, `day(s)`, `week(s)`, `month(s)` and `year(s)`

**tic.remove(date, amount, unit*)**
units are: `second(s)`, `minute(s)`, `hour(s)`, `day(s)`, `week(s)`, `month(s)` and `year(s)`

**tic.resetTime(date, time*)**
resets the time to all zeros, if you don't provide another time (eg "12:04:59")

**tic.isToday(date)**

**tic.isLeapYear(date)**

### smart stuff from moment to byte

* `moment().startOf("week")
* `moment().endOf("week")
* `moment().diff(item.getEndDate(), "days")`
* `moment().year()`
