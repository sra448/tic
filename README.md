# TIC
## simple date library

`tic` is really only a bunch of functions for handling js dates. Instead of wrapping the traditional date object or even extending its prototype, `tic` aims to help you deal with the real thing, the good old javascript date object.

## Features:

### tic.equals(date1, date2)
since `date1 == date2` checks for the identity instead of the value

### tic.format(date, format*)

### tic.parse(str, format*)

### tic.add(date, amount, unit*)
units are: `second(s)`, `minute(s)`, `hour(s)`, `day(s)`, `week(s)`, months and `year(s)`

### tic.remove(date, amount, unit*)
units are: `second(s)`, `minute(s)`, `hour(s)`, `day(s)`, `week(s)`, months and `year(s)`

### tic.resetTime(date, time*)
time defaults to 00:00:00

### tic.isToday(date)

### tic.isLeapYear(date)

## smart stuff from moment to byte

* `!moment().isSame(user.getActivityTimestamp(),'day')`
* `moment().startOf("week") > endDate.startOf("week")`
* `moment().diff(item.getEndDate(), "days") `
* `moment().year()`
