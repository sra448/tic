date = new Date "2.3.2012 01:03:02"

describe "tic.compare(date1, date2, precision*)", ->

  it "returns 1 if the second date is bigger", ->
    (expect (tic.compare date, (new Date "2.4.2012 01:03:02"))).toEqual 1

  it "returns -1 if the second date is smaller", ->
    (expect (tic.compare date, (new Date "2.1.2012 01:03:02"))).toEqual -1

  it "returns 0 if the dates are equal", ->
    (expect (tic.compare date, (new Date "2.3.2012 01:03:02"))).toEqual 0

  it "can handle pseudo-equality down to seconds", ->
    (expect (tic.compare date, (new Date "2.3.2012 01:03:03"), "min")).toEqual 0

  it "can handle pseudo-equality down to minutes", ->
    (expect (tic.compare date, (new Date "2.3.2012 01:03:03"), "min")).toEqual 0
    (expect (tic.compare date, (new Date "2.3.2012 01:03:43"), "min")).toEqual 0

  it "can handle pseudo-equality down to hours", ->
    (expect (tic.compare date, (new Date "2.3.2012 01:01:02"), "h")).toEqual 0
    (expect (tic.compare date, (new Date "2.3.2012 01:39:33"), "h")).toEqual 0

  it "can handle pseudo-equality down to days", ->
    (expect (tic.compare date, (new Date "2.3.2012 03:03:02"), "d")).toEqual 0
    (expect (tic.compare date, (new Date "2.3.2012 10:23:02"), "d")).toEqual 0

  it "can handle pseudo-equality down to months", ->
    (expect (tic.compare date, (new Date "2.1.2012 01:03:02"), "m")).toEqual 0
    (expect (tic.compare date, (new Date "2.5.2012 02:04:02"), "m")).toEqual 0

  it "can handle pseudo-equality down to years", ->
    (expect (tic.compare date, (new Date "4.9.2012 01:53:02"), "y")).toEqual 0
    (expect (tic.compare date, (new Date "12.3.2012 11:03:02"), "y")).toEqual 0

describe "tic.equals(date1, date2, precision*)", ->

  it "is an easy way to test equality of values (instead of identity as in ==)  ", ->
    (expect (tic.equals date, new Date "2.3.2012 01:03:02")).toEqual true
    (expect (tic.equals date, new Date "2.3.2012 01:03:01")).toEqual false

  it "can handle pseudo-equality down to seconds", ->
    (expect (tic.equals date, (new Date "2.3.2012 01:03:02"), "s")).toEqual true
    (expect (tic.equals date, (new Date "2.3.2012 01:03:01"), "s")).toEqual false

  it "can handle pseudo-equality down to minutes", ->
    (expect (tic.equals date, (new Date "2.3.2012 01:03:01"), "min")).toEqual true
    (expect (tic.equals date, (new Date "2.3.2012 01:02:02"), "min")).toEqual false

  it "can handle pseudo-equality down to hours", ->
    (expect (tic.equals date, (new Date "2.3.2012 01:05:11"), "h")).toEqual true
    (expect (tic.equals date, (new Date "2.3.2012 02:03:01"), "h")).toEqual false

  it "can handle pseudo-equality down to days", ->
    (expect (tic.equals date, (new Date "2.3.2012 11:03:02"), "d")).toEqual true
    (expect (tic.equals date, (new Date "2.4.2012 01:03:02"), "d")).toEqual false

  it "can handle pseudo-equality down to months", ->
    (expect (tic.equals date, (new Date "2.13.2012 01:03:02"), "m")).toEqual true
    (expect (tic.equals date, (new Date "3.3.2012 01:03:02"), "m")).toEqual false

  it "can handle pseudo-equality down to years", ->
    (expect (tic.equals date, (new Date "5.13.2012 01:03:02"), "y")).toEqual true
    (expect (tic.equals date, (new Date "2.3.2013 01:03:02"), "y")).toEqual false

describe "tic.resetTime(date, time*)", ->

  it "takes any date, returns it with the provided time (hours:minutes:seconds)", ->
    (expect (tic.resetTime date, "10")).toEqual (new Date "2.3.2012 10:")
    (expect (tic.resetTime date, "10:23")).toEqual (new Date "2.3.2012 10:23:00")
    (expect (tic.resetTime date, "10:23:44")).toEqual (new Date "2.3.2012 10:23:44")
    (expect (tic.resetTime date, "13:23:44")).toEqual (new Date "2.3.2012 13:23:44")

  it "defaults to 00:00", ->
    (expect (tic.resetTime date)).toEqual (new Date "2.3.2012 00:00:00")

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

  # it "knows how to parse YYYY", -> (expect (tic.parse "2012", "YYYY")).toEqual
  # it "knows how to parse YY",   -> (expect (tic.parse "12", "YY"  )).toEqual
  # # it "knows how to parse MMMM", -> (expect (tic.parse "February", "MMMM")).toEqual
  # # it "knows how to parse MMM",  -> (expect (tic.parse "Feb", "MMM" )).toEqual
  # it "knows how to parse MM",   -> (expect (tic.parse "02", "MM"  )).toEqual
  # it "knows how to parse M",    -> (expect (tic.parse "2", "M"   )).toEqual
  # it "knows how to parse DD",   -> (expect (tic.parse "03", "DD"  )).toEqual
  # it "knows how to parse D",    -> (expect (tic.parse "3", "D"   )).toEqual
  # # it "knows how to parse dddd", -> (expect (tic.parse "Friday", "dddd")).toEqual
  # # it "knows how to parse ddd",  -> (expect (tic.parse "Fri", "ddd" )).toEqual
  # # it "knows how to parse dd",   -> (expect (tic.parse "Fr", "dd"  )).toEqual
  # it "knows how to parse d",    -> (expect (tic.parse "5", "d"   )).toEqual
  # it "knows how to parse HH",   -> (expect (tic.parse "01", "HH"  )).toEqual
  # it "knows how to parse H",    -> (expect (tic.parse "1", "H"   )).toEqual
  # it "knows how to parse mm",   -> (expect (tic.parse "03", "mm"  )).toEqual
  # it "knows how to parse m",    -> (expect (tic.parse "3", "m"   )).toEqual
  # it "knows how to parse SS",   -> (expect (tic.parse "02", "SS"  )).toEqual
  # it "knows how to parse S",    -> (expect (tic.parse "2", "S"   )).toEqual
  # it "knows how to parse ss",   -> (expect (tic.parse "02", "ss"  )).toEqual
  # it "knows how to parse s",    -> (expect (tic.parse "2", "s"   )).toEqual

  it "returns a date object of the current date, given an empty string or nothing", ->
    (expect (tic.parse "")).toEqual new Date()

  it "works like a reverse format and takes a formatStr as an optional parameter", ->
    (expect (tic.parse "12.24.2013")).toEqual (new Date "12.24.2013 00:00:00")
    (expect (tic.parse "24122013", "DDMMYYYY")).toEqual (new Date "12.24.2013 00:00:00")
    (expect (tic.parse "24.12.2013", "DD.MM.YYYY")).toEqual (new Date "12.24.2013 00:00:00")
    (expect (tic.parse "12/24/2013", "MM/DD/YYYY")).toEqual (new Date "12.24.2013 00:00:00")
    (expect (tic.parse "24-12-2013", "DD-MM-YYYY")).toEqual (new Date "12.24.2013 00:00:00")

    (expect (tic.parse "241220131335", "DDMMYYYYHHmm")).toEqual (new Date "12.24.2013 13:35:00")
    (expect (tic.parse "24.12.2013 13:35", "DD.MM.YYYY HH:mm")).toEqual (new Date "12.24.2013 13:35:00")
    (expect (tic.parse "12/24/2013 at 1335", "MM/DD/YYYY at HHmm")).toEqual (new Date "12.24.2013 13:35:00")
    (expect (tic.parse "24-12-2013 13-35", "DD-MM-YYYY HH-mm")).toEqual (new Date "12.24.2013 13:35:00")

describe "tic.isToday(date)", ->

  it "knows whether it is today", -> (expect (tic.isToday date)).toEqual false
  it "or not", -> (expect (tic.isToday new Date())).toEqual true

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

  it "takes dates as input", -> (expect (tic.isLeapYear new Date "2.3.2000 01:03:02")).toEqual true
  it "takes strings as input", -> (expect (tic.isLeapYear "2000")).toEqual true
  it "takes integers as input", -> (expect (tic.isLeapYear 2000)).toEqual true

describe "tic.add(date, amount, unit*)", ->

  it "defaults to days", ->
    (expect (tic.add date, 1)).toEqual (new Date "2.4.2012 01:03:02")

  it "knows how to add seconds to a date", ->
    (expect (tic.add date, 1, "second" )).toEqual (new Date "2.3.2012 01:03:03")
    (expect (tic.add date, 1, "seconds")).toEqual (new Date "2.3.2012 01:03:03")

  it "knows how to add minutes to a date", ->
    (expect (tic.add date, 1, "minute" )).toEqual (new Date "2.3.2012 01:04:02")
    (expect (tic.add date, 1, "minutes")).toEqual (new Date "2.3.2012 01:04:02")

  it "knows how to add hours to a date", ->
    (expect (tic.add date, 1, "hour" )).toEqual (new Date "2.3.2012 02:03:02")
    (expect (tic.add date, 1, "hours")).toEqual (new Date "2.3.2012 02:03:02")

  it "knows how to add days to a date", ->
    (expect (tic.add date, 1, "day" )).toEqual (new Date "2.4.2012 01:03:02")
    (expect (tic.add date, 2, "days")).toEqual (new Date "2.5.2012 01:03:02")
    (expect (tic.add date, 3, "days")).toEqual (new Date "2.6.2012 01:03:02")
    (expect (tic.add date, 4, "days")).toEqual (new Date "2.7.2012 01:03:02")
    (expect (tic.add date, 5, "days")).toEqual (new Date "2.8.2012 01:03:02")
    (expect (tic.add date, 10, "days")).toEqual (new Date "2.13.2012 01:03:02")
    (expect (tic.add date, 20, "days")).toEqual (new Date "2.23.2012 01:03:02")
    (expect (tic.add date, 29, "days")).toEqual (new Date "3.3.2012 01:03:02")
    (expect (tic.add date, 366, "days")).toEqual (new Date "2.3.2013 01:03:02")

  it "knows how to add weeks to a date", ->
    (expect (tic.add date, 1, "week" )).toEqual (new Date "2.10.2012 01:03:02")
    (expect (tic.add date, 1, "weeks")).toEqual (new Date "2.10.2012 01:03:02")

  it "knows how to add months to a date", ->
    cases =
      "1" : "3.3.2012 01:03:02"
      "2" : "4.3.2012 01:03:02"
      "3" : "5.3.2012 01:03:02"
      "4" : "6.3.2012 01:03:02"
      "5" : "7.3.2012 01:03:02"
      "6" : "8.3.2012 01:03:02"
      "7" : "9.3.2012 01:03:02"
      "8" : "10.3.2012 01:03:02"
      "9" : "11.3.2012 01:03:02"
      "10": "12.3.2012 01:03:02"
      "11": "1.3.2013 01:03:02"
      # "12": "2.3.2013 01:03:02"

    (expect (tic.add date, k, "months")).toEqual (new Date v) for k,v of cases

  it "adding months over leapyears works as expected", ->
    # (expect (tic.add date, 12  , "months")).toEqual (new Date "2.3.2013 01:03:02")

  it "knows how to add years to a date", ->
    (expect (tic.add date, 1, "year" )).toEqual (new Date "2.3.2013 01:03:02")
    (expect (tic.add date, 1, "years")).toEqual (new Date "2.3.2013 01:03:02")

  it "adding years over leapyears works as expected", ->
    (expect (tic.add date, 4   , "years")).toEqual (new Date "2.3.2016 01:03:02")
    (expect (tic.add date, 10  , "years")).toEqual (new Date "2.3.2022 01:03:02")
    (expect (tic.add date, 100 , "years")).toEqual (new Date "2.3.2112 01:03:02")
    (expect (tic.add date, 1000, "years")).toEqual (new Date "2.3.3012 01:03:02")

describe "tic.remove(date, amount, unit*)", ->

  it "defaults to days", ->
    (expect (tic.remove date, 1)).toEqual (new Date "2.2.2012 01:03:02")

  it "knows how to remove seconds from a date", ->
    (expect (tic.remove date, 1, "second" )).toEqual (new Date "2.3.2012 01:03:01")
    (expect (tic.remove date, 1, "seconds")).toEqual (new Date "2.3.2012 01:03:01")

  it "knows how to remove minutes from a date", ->
    (expect (tic.remove date, 1, "minute" )).toEqual (new Date "2.3.2012 01:02:02")
    (expect (tic.remove date, 1, "minutes")).toEqual (new Date "2.3.2012 01:02:02")

  it "knows how to remove hours from a date", ->
    (expect (tic.remove date, 1, "hour" )).toEqual (new Date "2.3.2012 00:03:02")
    (expect (tic.remove date, 1, "hours")).toEqual (new Date "2.3.2012 00:03:02")

  it "knows how to remove days from a date", ->
    (expect (tic.remove date, 1, "day" )).toEqual (new Date "2.2.2012 01:03:02")
    (expect (tic.remove date, 1, "days")).toEqual (new Date "2.2.2012 01:03:02")

  it "knows how to remove weeks from a date", ->
    (expect (tic.remove date, 1, "week" )).toEqual (new Date "1.27.2012 01:03:02")
    (expect (tic.remove date, 1, "weeks")).toEqual (new Date "1.27.2012 01:03:02")

  it "knows how to remove months to a date", ->
    (expect (tic.remove date, 1, "month" )).toEqual (new Date "1.3.2012 01:03:02")
    (expect (tic.remove date, 1, "months")).toEqual (new Date "1.3.2012 01:03:02")

  # it "removing months over leapyears works as expected", ->
  #   (expect (tic.remove date, 120, "months")).toEqual (new Date "1.3.2012 01:03:02")

  it "knows how to remove years to a date", ->
    (expect (tic.remove date, 1, "year" )).toEqual (new Date "2.3.2011 01:03:02")
    (expect (tic.remove date, 1, "years")).toEqual (new Date "2.3.2011 01:03:02")

  it "removing years over leapyears works as expected", ->
    (expect (tic.remove date, 4   , "years")).toEqual (new Date "2.3.2008 01:03:02")
    (expect (tic.remove date, 10  , "years")).toEqual (new Date "2.3.2002 01:03:02")
    (expect (tic.remove date, 100 , "years")).toEqual (new Date "2.3.1912 01:03:02")
    (expect (tic.remove date, 1000, "years")).toEqual (new Date "2.3.1012 01:03:02")
