# TIC(K?)
## the simple date library

tic provides some simple functions for date-related stuff.

Instead of wrapping the traditional date object (like moment.js) or even extending its prototype (like date.js), tic aims to help you deal with the real thing, plain js date objects.

## as of now, tic can:

* tic.format(date, format*)
* tic.parse(str, format*)
* tic.add(date, amount, unit*)
* tic.remove(date, amount, unit*)
* tic.resetTime(date, time*)
* tic.isToday(date)