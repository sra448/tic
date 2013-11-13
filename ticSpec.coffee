date = new Date "2.3.2012 01:03:02"

describe "tic.resetTime", ->

  it "takes any date, returns it with no time (00:00:000)", ->
    (expect (tic.resetTime date)).toEqual (new Date "2.3.2012 00:00:00")

  it "takes any date, returns it with the provided time (hours:minutes:seconds)", ->
    (expect (tic.resetTime date, "10")).toEqual (new Date "2.3.2012 10:")
    (expect (tic.resetTime date, "10:23")).toEqual (new Date "2.3.2012 10:23:00")
    (expect (tic.resetTime date, "10:23:44")).toEqual (new Date "2.3.2012 10:23:44")
    (expect (tic.resetTime date, "13:23:44")).toEqual (new Date "2.3.2012 13:23:44")

describe "tic.format", ->

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

describe "tic.parse", ->

  it "works like a reverse format and takes a formatStr as an optional parameter", ->

    (expect (tic.parse "24122013", "DDMMYYYY")).toEqual (new Date "12.24.2013 00:00:00")
    (expect (tic.parse "24.12.2013", "DD.MM.YYYY")).toEqual (new Date "12.24.2013 00:00:00")
    (expect (tic.parse "12/24/2013", "MM/DD/YYYY")).toEqual (new Date "12.24.2013 00:00:00")
    (expect (tic.parse "24-12-2013", "DD-MM-YYYY")).toEqual (new Date "12.24.2013 00:00:00")

    (expect (tic.parse "241220131335", "DDMMYYYYHHmm")).toEqual (new Date "12.24.2013 13:35:00")
    (expect (tic.parse "24.12.2013 13:35", "DD.MM.YYYY HH:mm")).toEqual (new Date "12.24.2013 13:35:00")
    (expect (tic.parse "12/24/2013 at 1335", "MM/DD/YYYY at HHmm")).toEqual (new Date "12.24.2013 13:35:00")
    (expect (tic.parse "24-12-2013 13-35", "DD-MM-YYYY HH-mm")).toEqual (new Date "12.24.2013 13:35:00")

  it "returns a date object of the current date, given an empty string or nothing", ->
    (expect (tic.parse "")).toEqual new Date()

  # it("returns a date object, given a date string", function() {
  #   expect(tic.parse("Thu Jun 06 2013 19:40:02 GMT+0200 (CEST)")).toEqual(new Date("Thu Jun 06 2013 19:40:02 GMT+0200 (CEST)"))
  # })

describe "tic.isToday", ->

  it "knows if it is today", ->
    (expect (tic.isToday date)).toEqual false
    (expect (tic.isToday new Date())).toEqual true

# describe "tic.add / tic.remove", ->

#   date = new Date "1.1.2012 01:01:01"

#   it "know how to add time to a date", ->
#     (expect (tic.format (tic.add date, 1, "days"), "DD")).toEqual "02"
    # expect(tic.format(tic.add(date, 1, "year"), "YYYY")).toEqual("2013")
