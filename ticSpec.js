(function() {
  var date;

  date = new Date("2.3.2012 01:03:02");

  describe("tic.resetTime(date, time*)", function() {
    it("defaults to 00:00", function() {
      return (expect(tic.resetTime(date))).toEqual(new Date("2.3.2012 00:00:00"));
    });
    return it("takes any date, returns it with the provided time (hours:minutes:seconds)", function() {
      (expect(tic.resetTime(date, "10"))).toEqual(new Date("2.3.2012 10:"));
      (expect(tic.resetTime(date, "10:23"))).toEqual(new Date("2.3.2012 10:23:00"));
      (expect(tic.resetTime(date, "10:23:44"))).toEqual(new Date("2.3.2012 10:23:44"));
      return (expect(tic.resetTime(date, "13:23:44"))).toEqual(new Date("2.3.2012 13:23:44"));
    });
  });

  describe("tic.format(date, format*)", function() {
    it("defaults to MM/DD/YYYY", function() {
      return (expect(tic.format(date))).toEqual("02/03/2012");
    });
    it("knows how to format YYYY", function() {
      return (expect(tic.format(date, "YYYY"))).toEqual("2012");
    });
    it("knows how to format YY", function() {
      return (expect(tic.format(date, "YY"))).toEqual("12");
    });
    it("knows how to format MMMM", function() {
      return (expect(tic.format(date, "MMMM"))).toEqual("February");
    });
    it("knows how to format MMM", function() {
      return (expect(tic.format(date, "MMM"))).toEqual("Feb");
    });
    it("knows how to format MM", function() {
      return (expect(tic.format(date, "MM"))).toEqual("02");
    });
    it("knows how to format M", function() {
      return (expect(tic.format(date, "M"))).toEqual("2");
    });
    it("knows how to format DD", function() {
      return (expect(tic.format(date, "DD"))).toEqual("03");
    });
    it("knows how to format D", function() {
      return (expect(tic.format(date, "D"))).toEqual("3");
    });
    it("knows how to format dddd", function() {
      return (expect(tic.format(date, "dddd"))).toEqual("Friday");
    });
    it("knows how to format ddd", function() {
      return (expect(tic.format(date, "ddd"))).toEqual("Fri");
    });
    it("knows how to format dd", function() {
      return (expect(tic.format(date, "dd"))).toEqual("Fr");
    });
    it("knows how to format d", function() {
      return (expect(tic.format(date, "d"))).toEqual("5");
    });
    it("knows how to format HH", function() {
      return (expect(tic.format(date, "HH"))).toEqual("01");
    });
    it("knows how to format H", function() {
      return (expect(tic.format(date, "H"))).toEqual("1");
    });
    it("knows how to format mm", function() {
      return (expect(tic.format(date, "mm"))).toEqual("03");
    });
    it("knows how to format m", function() {
      return (expect(tic.format(date, "m"))).toEqual("3");
    });
    it("knows how to format SS", function() {
      return (expect(tic.format(date, "SS"))).toEqual("02");
    });
    it("knows how to format S", function() {
      return (expect(tic.format(date, "S"))).toEqual("2");
    });
    it("knows how to format ss", function() {
      return (expect(tic.format(date, "ss"))).toEqual("02");
    });
    return it("knows how to format s", function() {
      return (expect(tic.format(date, "s"))).toEqual("2");
    });
  });

  describe("tic.parse(string, format*)", function() {
    it("undefined parses to now", function() {
      return (expect(tic.parse())).toEqual(new Date);
    });
    it("an empty string parses now", function() {
      return (expect(tic.parse(""))).toEqual(new Date);
    });
    it("works like a reverse format and takes a formatStr as an optional parameter", function() {
      (expect(tic.parse("12.24.2013"))).toEqual(new Date("12.24.2013 00:00:00"));
      (expect(tic.parse("24122013", "DDMMYYYY"))).toEqual(new Date("12.24.2013 00:00:00"));
      (expect(tic.parse("24.12.2013", "DD.MM.YYYY"))).toEqual(new Date("12.24.2013 00:00:00"));
      (expect(tic.parse("12/24/2013", "MM/DD/YYYY"))).toEqual(new Date("12.24.2013 00:00:00"));
      (expect(tic.parse("24-12-2013", "DD-MM-YYYY"))).toEqual(new Date("12.24.2013 00:00:00"));
      (expect(tic.parse("241220131335", "DDMMYYYYHHmm"))).toEqual(new Date("12.24.2013 13:35:00"));
      (expect(tic.parse("24.12.2013 13:35", "DD.MM.YYYY HH:mm"))).toEqual(new Date("12.24.2013 13:35:00"));
      (expect(tic.parse("12/24/2013 at 1335", "MM/DD/YYYY at HHmm"))).toEqual(new Date("12.24.2013 13:35:00"));
      return (expect(tic.parse("24-12-2013 13-35", "DD-MM-YYYY HH-mm"))).toEqual(new Date("12.24.2013 13:35:00"));
    });
    return it("returns a date object of the current date, given an empty string or nothing", function() {
      return (expect(tic.parse(""))).toEqual(new Date());
    });
  });

  describe("tic.isToday(date)", function() {
    it("knows wheater it is today", function() {
      return (expect(tic.isToday(date))).toEqual(false);
    });
    return it("or not", function() {
      return (expect(tic.isToday(new Date()))).toEqual(true);
    });
  });

  describe("tic.isLeapYear(date)", function() {
    it("every 4th year is a leapyear", function() {
      (expect(tic.isLeapYear(2001))).toEqual(false);
      (expect(tic.isLeapYear(2002))).toEqual(false);
      (expect(tic.isLeapYear(2003))).toEqual(false);
      return (expect(tic.isLeapYear(2004))).toEqual(true);
    });
    it("but then every 100th isn't", function() {
      (expect(tic.isLeapYear(2096))).toEqual(true);
      (expect(tic.isLeapYear(2100))).toEqual(false);
      return (expect(tic.isLeapYear(2104))).toEqual(true);
    });
    it("and lastly every 400th is one", function() {
      (expect(tic.isLeapYear(1900))).toEqual(false);
      (expect(tic.isLeapYear(2000))).toEqual(true);
      return (expect(tic.isLeapYear(2100))).toEqual(false);
    });
    it("takes dates as input", function() {
      return (expect(tic.isLeapYear(new Date("2.3.2000 01:03:02")))).toEqual(true);
    });
    it("takes strings as input", function() {
      return (expect(tic.isLeapYear("2000"))).toEqual(true);
    });
    return it("takes integers as input", function() {
      return (expect(tic.isLeapYear(2000))).toEqual(true);
    });
  });

  describe("tic.add(date, amount, unit*)", function() {
    it("defaults to seconds", function() {
      return (expect(tic.add(date, 1))).toEqual(new Date("2.3.2012 01:03:03"));
    });
    it("knows how to add seconds to a date", function() {
      (expect(tic.add(date, 1, "second"))).toEqual(new Date("2.3.2012 01:03:03"));
      return (expect(tic.add(date, 1, "seconds"))).toEqual(new Date("2.3.2012 01:03:03"));
    });
    it("knows how to add minutes to a date", function() {
      (expect(tic.add(date, 1, "minute"))).toEqual(new Date("2.3.2012 01:04:02"));
      return (expect(tic.add(date, 1, "minutes"))).toEqual(new Date("2.3.2012 01:04:02"));
    });
    it("knows how to add hours to a date", function() {
      (expect(tic.add(date, 1, "hour"))).toEqual(new Date("2.3.2012 02:03:02"));
      return (expect(tic.add(date, 1, "hours"))).toEqual(new Date("2.3.2012 02:03:02"));
    });
    it("knows how to add days to a date", function() {
      (expect(tic.add(date, 1, "day"))).toEqual(new Date("2.4.2012 01:03:02"));
      return (expect(tic.add(date, 1, "days"))).toEqual(new Date("2.4.2012 01:03:02"));
    });
    return it("knows how to add weeks to a date", function() {
      (expect(tic.add(date, 1, "week"))).toEqual(new Date("2.10.2012 01:03:02"));
      return (expect(tic.add(date, 1, "weeks"))).toEqual(new Date("2.10.2012 01:03:02"));
    });
  });

  describe("tic.remove(date, amount, unit*)", function() {
    it("defaults to seconds", function() {
      return (expect(tic.remove(date, 1))).toEqual(new Date("2.3.2012 01:03:01"));
    });
    it("knows how to remove seconds from a date", function() {
      (expect(tic.remove(date, 1, "second"))).toEqual(new Date("2.3.2012 01:03:01"));
      return (expect(tic.remove(date, 1, "seconds"))).toEqual(new Date("2.3.2012 01:03:01"));
    });
    it("knows how to remove minutes from a date", function() {
      (expect(tic.remove(date, 1, "minute"))).toEqual(new Date("2.3.2012 01:02:02"));
      return (expect(tic.remove(date, 1, "minutes"))).toEqual(new Date("2.3.2012 01:02:02"));
    });
    it("knows how to remove hours from a date", function() {
      (expect(tic.remove(date, 1, "hour"))).toEqual(new Date("2.3.2012 00:03:02"));
      return (expect(tic.remove(date, 1, "hours"))).toEqual(new Date("2.3.2012 00:03:02"));
    });
    it("knows how to remove days from a date", function() {
      (expect(tic.remove(date, 1, "day"))).toEqual(new Date("2.2.2012 01:03:02"));
      return (expect(tic.remove(date, 1, "days"))).toEqual(new Date("2.2.2012 01:03:02"));
    });
    return it("knows how to remove weeks from a date", function() {
      (expect(tic.remove(date, 1, "week"))).toEqual(new Date("1.27.2012 01:03:02"));
      return (expect(tic.remove(date, 1, "weeks"))).toEqual(new Date("1.27.2012 01:03:02"));
    });
  });

}).call(this);
