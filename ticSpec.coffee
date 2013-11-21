date = new Date 2012, 1, 3, 1, 3, 2
date2 = new Date 2022, 1, 3, 1, 3, 2

describe "tic.compare(date1, date2, precision*)", ->

  it "returns 1 if the second date is bigger", ->
    (expect (tic.compare date, (new Date 2012, 1, 4, 1, 3, 2))).toEqual 1

  it "returns -1 if the second date is smaller", ->
    (expect (tic.compare date, (new Date 2012, 1, 1, 1, 3, 2))).toEqual -1

  it "returns 0 if the dates are equal", ->
    (expect (tic.compare date, (new Date 2012, 1, 3, 1, 3, 2))).toEqual 0

  it "can handle pseudo-equality down to seconds", ->
    (expect (tic.compare date, (new Date 2012, 1, 3, 1, 3, 3), "min")).toEqual 0

  it "can handle pseudo-equality down to minutes", ->
    (expect (tic.compare date, (new Date 2012, 1, 3, 1, 3, 3), "min")).toEqual 0
    (expect (tic.compare date, (new Date 2012, 1, 3, 1, 3, 43), "min")).toEqual 0

  it "can handle pseudo-equality down to hours", ->
    (expect (tic.compare date, (new Date 2012, 1, 3, 1, 1, 2), "h")).toEqual 0
    (expect (tic.compare date, (new Date 2012, 1, 3, 1, 39, 33), "h")).toEqual 0

  it "can handle pseudo-equality down to days", ->
    (expect (tic.compare date, (new Date 2012, 1, 3, 3, 3, 2), "d")).toEqual 0
    (expect (tic.compare date, (new Date 2012, 1, 3, 10, 23, 2), "d")).toEqual 0

  it "can handle pseudo-equality down to months", ->
    (expect (tic.compare date, (new Date 2012, 1, 1, 1, 3, 2), "m")).toEqual 0
    (expect (tic.compare date, (new Date 2012, 1, 5, 2, 4, 2), "m")).toEqual 0

  it "can handle pseudo-equality down to years", ->
    (expect (tic.compare date, (new Date 2012, 3, 9, 1, 53, 2), "y")).toEqual 0
    (expect (tic.compare date, (new Date 2012, 11, 3, 11, 3, 2), "y")).toEqual 0

describe "tic.equals(date1, date2, precision*)", ->

  it "is an easy way to test equality of values (instead of identity as in ==)  ", ->
    (expect (tic.equals date, new Date 2012, 1, 3, 1, 3, 2)).toEqual true
    (expect (tic.equals date, new Date 2012, 1, 3, 1, 3, 1)).toEqual false

  it "can handle pseudo-equality down to seconds", ->
    (expect (tic.equals date, (new Date 2012, 1, 3, 1, 3, 2), "s")).toEqual true
    (expect (tic.equals date, (new Date 2012, 1, 3, 1, 3, 1), "s")).toEqual false

  it "can handle pseudo-equality down to minutes", ->
    (expect (tic.equals date, (new Date 2012, 1, 3, 1, 3, 1), "min")).toEqual true
    (expect (tic.equals date, (new Date 2012, 1, 3, 1, 2, 2), "min")).toEqual false

  it "can handle pseudo-equality down to hours", ->
    (expect (tic.equals date, (new Date 2012, 1, 3, 1, 5, 11), "h")).toEqual true
    (expect (tic.equals date, (new Date 2012, 1, 3, 2, 3, 1), "h")).toEqual false

  it "can handle pseudo-equality down to days", ->
    (expect (tic.equals date, (new Date 2012, 1, 3, 11, 3, 2), "d")).toEqual true
    (expect (tic.equals date, (new Date 2012, 1, 4, 1, 3, 2), "d")).toEqual false

  it "can handle pseudo-equality down to months", ->
    (expect (tic.equals date, (new Date 2012, 1, 13, 1, 3, 2), "m")).toEqual true
    (expect (tic.equals date, (new Date 2012, 2, 3, 1, 3, 2), "m")).toEqual false

  it "can handle pseudo-equality down to years", ->
    (expect (tic.equals date, (new Date 2012, 4, 13, 1, 3, 2), "y")).toEqual true
    (expect (tic.equals date, (new Date 2013, 1, 3, 1, 3, 2), "y")).toEqual false

describe "tic.resetTime(date, time*)", ->

  it "takes any date, returns it with the provided time (hours:minutes:seconds)", ->
    (expect (tic.resetTime date, "10")).toEqual (new Date 2012, 1, 3, 10)
    (expect (tic.resetTime date, "10:23")).toEqual (new Date 2012, 1, 3, 10, 23)
    (expect (tic.resetTime date, "10:23:44")).toEqual (new Date 2012, 1, 3, 10, 23, 44)
    (expect (tic.resetTime date, "13:23:44")).toEqual (new Date 2012, 1, 3, 13, 23, 44)

  it "defaults to 00:00", ->
    (expect (tic.resetTime date)).toEqual (new Date 2012, 1, 3)

describe "tic.format(date, format*)", ->

  it "defaults to MM/DD/YYYY",   -> (expect (tic.format date)).toEqual "02/03/2012"
  it "knows how to format YYYY", -> (expect (tic.format date, "YYYY")).toEqual "2012"
  it "knows how to format YY",   -> (expect (tic.format date, "YY"  )).toEqual "12"
  it "knows how to format MMMM", -> (expect (tic.format date, "MMMM")).toEqual "February"
  it "knows how to format MMM",  -> (expect (tic.format date, "MMM" )).toEqual "Feb"
  it "knows how to format MM",   -> (expect (tic.format date, "MM"  )).toEqual "02"
  it "knows how to format M",    -> (expect (tic.format date, "M"   )).toEqual "2"
  it "knows how to format DD",   -> (expect (tic.format date, "DD"  )).toEqual "03"
  it "knows how to format D",    -> (expect (tic.format date, "D"   )).toEqual "3"
  it "knows how to format dddd", -> (expect (tic.format date, "dddd")).toEqual "Friday"
  it "knows how to format ddd",  -> (expect (tic.format date, "ddd" )).toEqual "Fri"
  it "knows how to format dd",   -> (expect (tic.format date, "dd"  )).toEqual "Fr"
  it "knows how to format d",    -> (expect (tic.format date, "d"   )).toEqual "5"
  it "knows how to format HH",   -> (expect (tic.format date, "HH"  )).toEqual "01"
  it "knows how to format H",    -> (expect (tic.format date, "H"   )).toEqual "1"
  it "knows how to format mm",   -> (expect (tic.format date, "mm"  )).toEqual "03"
  it "knows how to format m",    -> (expect (tic.format date, "m"   )).toEqual "3"
  it "knows how to format SS",   -> (expect (tic.format date, "SS"  )).toEqual "02"
  it "knows how to format S",    -> (expect (tic.format date, "S"   )).toEqual "2"
  it "knows how to format ss",   -> (expect (tic.format date, "ss"  )).toEqual "02"
  it "knows how to format s",    -> (expect (tic.format date, "s"   )).toEqual "2"

describe "tic.parse(string, format*)", ->

  it "undefined parses to now", -> (expect (tic.parse())).toEqual (new Date)
  it "an empty string parses now", -> (expect (tic.parse(""))).toEqual (new Date)

  it "returns a date object of the current date, given an empty string or nothing", ->
    (expect (tic.parse "")).toEqual new Date

  it "works like a reverse format and takes a formatStr as an optional parameter", ->
    (expect (tic.parse "12.24.2013")).toEqual (new Date 2013, 11, 24)
    (expect (tic.parse "24122013", "DDMMYYYY")).toEqual (new Date 2013, 11, 24)
    (expect (tic.parse "24.12.2013", "DD.MM.YYYY")).toEqual (new Date 2013, 11, 24)
    (expect (tic.parse "12/24/2013", "MM/DD/YYYY")).toEqual (new Date 2013, 11, 24)
    (expect (tic.parse "24-12-2013", "DD-MM-YYYY")).toEqual (new Date 2013, 11, 24)

    (expect (tic.parse "241220131335", "DDMMYYYYHHmm")).toEqual (new Date 2013, 11, 24, 13, 35)
    (expect (tic.parse "24.12.2013 13:35", "DD.MM.YYYY HH:mm")).toEqual (new Date 2013, 11, 24, 13, 35)
    (expect (tic.parse "12/24/2013 at 1335", "MM/DD/YYYY at HHmm")).toEqual (new Date 2013, 11, 24, 13, 35)
    (expect (tic.parse "24-12-2013 13-35", "DD-MM-YYYY HH-mm")).toEqual (new Date 2013, 11, 24, 13, 35)

describe "tic.isPast(date, precision*)", ->

  it "knows if a date is in the past", ->
    (expect (tic.isPast date)).toEqual true
    (expect (tic.isPast new Date)).toEqual false

  it "takes day as the default precision", ->
    (expect (tic.isPast (tic.resetTime new Date))).toEqual false
    (expect (tic.isPast (tic.remove new Date, 1))).toEqual true

  it "but can be as accurately as one millisecond", ->
    (expect (tic.isPast (tic.remove new Date, 1, "ms"), "ms")).toEqual true
    (expect (tic.isPast new Date)).toEqual false

describe "tic.isToday(date)", ->

  it "knows if it is today", ->
    (expect (tic.isToday date)).toEqual false
    (expect (tic.isToday new Date)).toEqual true

describe "tic.isFuture(date, precision*)", ->

  it "knows whether a date is in the future", ->
    (expect (tic.isFuture date2)).toEqual true
    (expect (tic.isFuture new Date)).toEqual false

  it "takes day as the default precision", ->
    (expect (tic.isFuture (tic.resetTime new Date))).toEqual false

  it "but can be as accurately as one millisecond", ->
    (expect (tic.isFuture (tic.add new Date, "1", "ms"), "ms")).toEqual true
    (expect (tic.isFuture new Date)).toEqual false

describe "tic.isBetween(date, date1, date2)", ->

  it "knows if a date is between two dates", ->
    (expect (tic.isBetween new Date, date, date2)).toEqual true

describe "tic.isLeapYear(date)", ->

  it "every 4th year is a leapyear", ->
    (expect (tic.isLeapYear 2001)).toEqual false
    (expect (tic.isLeapYear 2002)).toEqual false
    (expect (tic.isLeapYear 2003)).toEqual false
    (expect (tic.isLeapYear 2004)).toEqual true
    (expect (tic.isLeapYear 2005)).toEqual false

  it "but then every 100th isn't", ->
    (expect (tic.isLeapYear 2096)).toEqual true
    (expect (tic.isLeapYear 2100)).toEqual false
    (expect (tic.isLeapYear 2104)).toEqual true

  it "and lastly every 400th is one", ->
    (expect (tic.isLeapYear 1900)).toEqual false
    (expect (tic.isLeapYear 2000)).toEqual true
    (expect (tic.isLeapYear 2100)).toEqual false

  it "takes dates as input", -> (expect (tic.isLeapYear new Date 2000, 1, 3, 1, 3, 2)).toEqual true
  it "takes strings as input", -> (expect (tic.isLeapYear "2000")).toEqual true
  it "takes integers as input", -> (expect (tic.isLeapYear 2000)).toEqual true

describe "tic.add(date, amount, unit*)", ->

  it "defaults to days", ->
    (expect (tic.add date, 1)).toEqual (new Date 2012, 1, 4, 1, 3, 2)

  it "knows how to add seconds to a date", ->
    (expect (tic.add date, 1, "second" )).toEqual (new Date 2012, 1, 3, 1, 3, 3)
    (expect (tic.add date, 1, "seconds")).toEqual (new Date 2012, 1, 3, 1, 3, 3)

  it "knows how to add minutes to a date", ->
    (expect (tic.add date, 1, "minute" )).toEqual (new Date 2012, 1, 3, 1, 4, 2)
    (expect (tic.add date, 1, "minutes")).toEqual (new Date 2012, 1, 3, 1, 4, 2)

  it "knows how to add hours to a date", ->
    (expect (tic.add date, 1, "hour" )).toEqual (new Date 2012, 1, 3, 2, 3, 2)
    (expect (tic.add date, 1, "hours")).toEqual (new Date 2012, 1, 3, 2, 3, 2)

  it "knows how to add days to a date", ->
    (expect (tic.add date, 1, "day" )).toEqual (new Date 2012, 1, 4, 1, 3, 2)
    (expect (tic.add date, 2, "days")).toEqual (new Date 2012, 1, 5, 1, 3, 2)
    (expect (tic.add date, 3, "days")).toEqual (new Date 2012, 1, 6, 1, 3, 2)
    (expect (tic.add date, 4, "days")).toEqual (new Date 2012, 1, 7, 1, 3, 2)
    (expect (tic.add date, 5, "days")).toEqual (new Date 2012, 1, 8, 1, 3, 2)
    (expect (tic.add date, 10, "days")).toEqual (new Date 2012, 1, 13, 1, 3, 2)
    (expect (tic.add date, 20, "days")).toEqual (new Date 2012, 1, 23, 1, 3, 2)
    (expect (tic.add date, 29, "days")).toEqual (new Date 2012, 2, 3, 1, 3, 2)
    (expect (tic.add date, 366, "days")).toEqual (new Date 2013, 1, 3, 1, 3, 2)

  it "knows how to add weeks to a date", ->
    (expect (tic.add date, 1, "week" )).toEqual (new Date 2012, 1, 10, 1, 3, 2)
    (expect (tic.add date, 1, "weeks")).toEqual (new Date 2012, 1, 10, 1, 3, 2)

  it "knows how to add months to a date", ->
    cases =
      "1" : [2012, 2, 3, 1, 3, 2]
      # "2" : "4.3.2012 01:03:02"
      # "3" : "5.3.2012 01:03:02"
      # "4" : "6.3.2012 01:03:02"
      # "5" : "7.3.2012 01:03:02"
      # "6" : "8.3.2012 01:03:02"
      # "7" : "9.3.2012 01:03:02"
      # "8" : "10.3.2012 01:03:02"
      # "9" : "11.3.2012 01:03:02"
      # "10": "12.3.2012 01:03:02"
      # "11": "1.3.2013 01:03:02"
      # "12": 2013, 1, 3, 1, 3, 2

    # (expect (tic.add date, k, "months")).toEqual (new Date v) for k,v of cases

  it "adding months over leapyears works as expected", ->
    # (expect (tic.add date, 12  , "months")).toEqual (new Date 2013, 1, 3, 1, 3, 2)

  it "knows how to add years to a date", ->
    (expect (tic.add date, 1, "year" )).toEqual (new Date 2013, 1, 3, 1, 3, 2)
    (expect (tic.add date, 1, "years")).toEqual (new Date 2013, 1, 3, 1, 3, 2)

  it "adding years over leapyears works as expected", ->
    (expect (tic.add date, 4   , "years")).toEqual (new Date 2016, 1, 3, 1, 3, 2)
    (expect (tic.add date, 10  , "years")).toEqual (new Date 2022, 1, 3, 1, 3, 2)
    (expect (tic.add date, 100 , "years")).toEqual (new Date 2112, 1, 3, 1, 3, 2)
    (expect (tic.add date, 1000, "years")).toEqual (new Date 3012, 1, 3, 1, 3, 2)

describe "tic.remove(date, amount, unit*)", ->

  it "defaults to days", ->
    (expect (tic.remove date, 1)).toEqual (new Date 2012, 1, 2, 1, 3, 2)

  it "knows how to remove seconds from a date", ->
    (expect (tic.remove date, 1, "second" )).toEqual (new Date 2012, 1, 3, 1, 3, 1)
    (expect (tic.remove date, 1, "seconds")).toEqual (new Date 2012, 1, 3, 1, 3, 1)

  it "knows how to remove minutes from a date", ->
    (expect (tic.remove date, 1, "minute" )).toEqual (new Date 2012, 1, 3, 1, 2, 2)
    (expect (tic.remove date, 1, "minutes")).toEqual (new Date 2012, 1, 3, 1, 2, 2)

  it "knows how to remove hours from a date", ->
    (expect (tic.remove date, 1, "hour" )).toEqual (new Date 2012, 1, 3, 0, 3, 2)
    (expect (tic.remove date, 1, "hours")).toEqual (new Date 2012, 1, 3, 0, 3, 2)

  it "knows how to remove days from a date", ->
    (expect (tic.remove date, 1, "day" )).toEqual (new Date 2012, 1, 2, 1, 3, 2)
    (expect (tic.remove date, 1, "days")).toEqual (new Date 2012, 1, 2, 1, 3, 2)

  it "knows how to remove weeks from a date", ->
    (expect (tic.remove date, 1, "week" )).toEqual (new Date 2012, 0, 27, 1, 3, 2)
    (expect (tic.remove date, 1, "weeks")).toEqual (new Date 2012, 0, 27, 1, 3, 2)

  it "knows how to remove months to a date", ->
    (expect (tic.remove date, 1, "month" )).toEqual (new Date 2012, 0, 3, 1, 3, 2)
    (expect (tic.remove date, 1, "months")).toEqual (new Date 2012, 0, 3, 1, 3, 2)

  # it "removing months over leapyears works as expected", ->
  #   (expect (tic.remove date, 120, "months")).toEqual (new Date 2012, 0, 3, 1, 3, 2)

  it "knows how to remove years to a date", ->
    (expect (tic.remove date, 1, "year" )).toEqual (new Date 2011, 1, 3, 1, 3, 2)
    (expect (tic.remove date, 1, "years")).toEqual (new Date 2011, 1, 3, 1, 3, 2)

  it "removing years over leapyears works as expected", ->
    (expect (tic.remove date, 4   , "years")).toEqual (new Date 2008, 1, 3, 1, 3, 2)
    (expect (tic.remove date, 10  , "years")).toEqual (new Date 2002, 1, 3, 1, 3, 2)
    (expect (tic.remove date, 100 , "years")).toEqual (new Date 1912, 1, 3, 1, 3, 2)
    (expect (tic.remove date, 1000, "years")).toEqual (new Date 1012, 1, 3, 1, 3, 2)
