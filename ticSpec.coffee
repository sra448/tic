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

  it "returns a date object of the current date, given an empty string", ->
    date = new Date()
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)

    (expect (tic.parse "")).toEqual date

  # it("returns a date object, given a date string", function() {
  #   expect(tic.parse("Thu Jun 06 2013 19:40:02 GMT+0200 (CEST)")).toEqual(new Date("Thu Jun 06 2013 19:40:02 GMT+0200 (CEST)"))
  # })

describe "tic.format", ->
  date = new Date "2.3.2012 01:03:02"

  it "handles YYYY", -> (expect (tic.format date, "YYYY")).toEqual "2012"
  it "handles YY",   -> (expect (tic.format date, "YY"  )).toEqual "12"
  it "handles MMMM", -> (expect (tic.format date, "MMMM")).toEqual "February"
  it "handles MMM",  -> (expect (tic.format date, "MMM" )).toEqual "Feb"
  it "handles MM",   -> (expect (tic.format date, "MM"  )).toEqual "02"
  it "handles M",    -> (expect (tic.format date, "M"   )).toEqual "2"
  it "handles DD",   -> (expect (tic.format date, "DD"  )).toEqual "03"
  it "handles D",    -> (expect (tic.format date, "D"   )).toEqual "3"
  it "handles dddd", -> (expect (tic.format date, "dddd")).toEqual "Friday"
  it "handles ddd",  -> (expect (tic.format date, "ddd" )).toEqual "Fri"
  it "handles dd",   -> (expect (tic.format date, "dd"  )).toEqual "Fr"
  it "handles d",    -> (expect (tic.format date, "d"   )).toEqual "5"
  it "handles HH",   -> (expect (tic.format date, "HH"  )).toEqual "01"
  it "handles H",    -> (expect (tic.format date, "H"   )).toEqual "1"
  it "handles mm",   -> (expect (tic.format date, "mm"  )).toEqual "03"
  it "handles m",    -> (expect (tic.format date, "m"   )).toEqual "3"
  it "handles SS",   -> (expect (tic.format date, "SS"  )).toEqual "02"
  it "handles S",    -> (expect (tic.format date, "S"   )).toEqual "2"
  it "handles ss",   -> (expect (tic.format date, "ss"  )).toEqual "02"
  it "handles s",    -> (expect (tic.format date, "s"   )).toEqual "2"

describe "tic.isToday", ->

  date = new Date "2.3.2012 01:03:02"

  it "knows if it is today", ->
    (expect (tic.isToday date)).toEqual false
    (expect (tic.isToday new Date())).toEqual true

describe "tic.add / tic.remove", ->

  date = new Date "1.1.2012 01:01:01"

  it "know how to add time to a date", ->
    (expect (tic.format (tic.add date, 1, "days"), "DD")).toEqual "02"
    # expect(tic.format(tic.add(date, 1, "year"), "YYYY")).toEqual("2013")