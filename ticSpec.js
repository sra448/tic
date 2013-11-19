(function() {
  var date, date2;

  date = new Date("2.3.2012 01:03:02");

  date2 = new Date("2.3.2022 01:03:02");

  describe("tic.compare(date1, date2, precision*)", function() {
    it("returns 1 if the second date is bigger", function() {
      return (expect(tic.compare(date, new Date("2.4.2012 01:03:02")))).toEqual(1);
    });
    it("returns -1 if the second date is smaller", function() {
      return (expect(tic.compare(date, new Date("2.1.2012 01:03:02")))).toEqual(-1);
    });
    it("returns 0 if the dates are equal", function() {
      return (expect(tic.compare(date, new Date("2.3.2012 01:03:02")))).toEqual(0);
    });
    it("can handle pseudo-equality down to seconds", function() {
      return (expect(tic.compare(date, new Date("2.3.2012 01:03:03"), "min"))).toEqual(0);
    });
    it("can handle pseudo-equality down to minutes", function() {
      (expect(tic.compare(date, new Date("2.3.2012 01:03:03"), "min"))).toEqual(0);
      return (expect(tic.compare(date, new Date("2.3.2012 01:03:43"), "min"))).toEqual(0);
    });
    it("can handle pseudo-equality down to hours", function() {
      (expect(tic.compare(date, new Date("2.3.2012 01:01:02"), "h"))).toEqual(0);
      return (expect(tic.compare(date, new Date("2.3.2012 01:39:33"), "h"))).toEqual(0);
    });
    it("can handle pseudo-equality down to days", function() {
      (expect(tic.compare(date, new Date("2.3.2012 03:03:02"), "d"))).toEqual(0);
      return (expect(tic.compare(date, new Date("2.3.2012 10:23:02"), "d"))).toEqual(0);
    });
    it("can handle pseudo-equality down to months", function() {
      (expect(tic.compare(date, new Date("2.1.2012 01:03:02"), "m"))).toEqual(0);
      return (expect(tic.compare(date, new Date("2.5.2012 02:04:02"), "m"))).toEqual(0);
    });
    return it("can handle pseudo-equality down to years", function() {
      (expect(tic.compare(date, new Date("4.9.2012 01:53:02"), "y"))).toEqual(0);
      return (expect(tic.compare(date, new Date("12.3.2012 11:03:02"), "y"))).toEqual(0);
    });
  });

  describe("tic.equals(date1, date2, precision*)", function() {
    it("is an easy way to test equality of values (instead of identity as in ==)  ", function() {
      (expect(tic.equals(date, new Date("2.3.2012 01:03:02")))).toEqual(true);
      return (expect(tic.equals(date, new Date("2.3.2012 01:03:01")))).toEqual(false);
    });
    it("can handle pseudo-equality down to seconds", function() {
      (expect(tic.equals(date, new Date("2.3.2012 01:03:02"), "s"))).toEqual(true);
      return (expect(tic.equals(date, new Date("2.3.2012 01:03:01"), "s"))).toEqual(false);
    });
    it("can handle pseudo-equality down to minutes", function() {
      (expect(tic.equals(date, new Date("2.3.2012 01:03:01"), "min"))).toEqual(true);
      return (expect(tic.equals(date, new Date("2.3.2012 01:02:02"), "min"))).toEqual(false);
    });
    it("can handle pseudo-equality down to hours", function() {
      (expect(tic.equals(date, new Date("2.3.2012 01:05:11"), "h"))).toEqual(true);
      return (expect(tic.equals(date, new Date("2.3.2012 02:03:01"), "h"))).toEqual(false);
    });
    it("can handle pseudo-equality down to days", function() {
      (expect(tic.equals(date, new Date("2.3.2012 11:03:02"), "d"))).toEqual(true);
      return (expect(tic.equals(date, new Date("2.4.2012 01:03:02"), "d"))).toEqual(false);
    });
    it("can handle pseudo-equality down to months", function() {
      (expect(tic.equals(date, new Date("2.13.2012 01:03:02"), "m"))).toEqual(true);
      return (expect(tic.equals(date, new Date("3.3.2012 01:03:02"), "m"))).toEqual(false);
    });
    return it("can handle pseudo-equality down to years", function() {
      (expect(tic.equals(date, new Date("5.13.2012 01:03:02"), "y"))).toEqual(true);
      return (expect(tic.equals(date, new Date("2.3.2013 01:03:02"), "y"))).toEqual(false);
    });
  });

  describe("tic.resetTime(date, time*)", function() {
    it("takes any date, returns it with the provided time (hours:minutes:seconds)", function() {
      (expect(tic.resetTime(date, "10"))).toEqual(new Date("2.3.2012 10:"));
      (expect(tic.resetTime(date, "10:23"))).toEqual(new Date("2.3.2012 10:23:00"));
      (expect(tic.resetTime(date, "10:23:44"))).toEqual(new Date("2.3.2012 10:23:44"));
      return (expect(tic.resetTime(date, "13:23:44"))).toEqual(new Date("2.3.2012 13:23:44"));
    });
    return it("defaults to 00:00", function() {
      return (expect(tic.resetTime(date))).toEqual(new Date("2.3.2012 00:00:00"));
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
    it("returns a date object of the current date, given an empty string or nothing", function() {
      return (expect(tic.parse(""))).toEqual(new Date);
    });
    return it("works like a reverse format and takes a formatStr as an optional parameter", function() {
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
  });

  describe("tic.isPast(date, precision*)", function() {
    it("knows if a date is in the past", function() {
      (expect(tic.isPast(date))).toEqual(true);
      return (expect(tic.isPast(new Date))).toEqual(false);
    });
    it("takes day as the default precision", function() {
      (expect(tic.isPast(tic.resetTime(new Date)))).toEqual(false);
      return (expect(tic.isPast(tic.remove(new Date, 1)))).toEqual(true);
    });
    return it("but can be as accurately as one millisecond", function() {
      (expect(tic.isPast(tic.remove(new Date, 1, "ms"), "ms"))).toEqual(true);
      return (expect(tic.isPast(new Date))).toEqual(false);
    });
  });

  describe("tic.isToday(date)", function() {
    return it("knows if it is today", function() {
      (expect(tic.isToday(date))).toEqual(false);
      return (expect(tic.isToday(new Date))).toEqual(true);
    });
  });

  describe("tic.isFuture(date, precision*)", function() {
    it("knows whether a date is in the future", function() {
      (expect(tic.isFuture(date2))).toEqual(true);
      return (expect(tic.isFuture(new Date))).toEqual(false);
    });
    it("takes day as the default precision", function() {
      return (expect(tic.isFuture(tic.resetTime(new Date)))).toEqual(false);
    });
    return it("but can be as accurately as one millisecond", function() {
      (expect(tic.isFuture(tic.add(new Date, "1", "ms"), "ms"))).toEqual(true);
      return (expect(tic.isFuture(new Date))).toEqual(false);
    });
  });

  describe("tic.isBetween(date, date1, date2)", function() {
    return it("knows if a date is between two dates", function() {
      return (expect(tic.isBetween(new Date, date, date2))).toEqual(true);
    });
  });

  describe("tic.isLeapYear(date)", function() {
    it("every 4th year is a leapyear", function() {
      (expect(tic.isLeapYear(2001))).toEqual(false);
      (expect(tic.isLeapYear(2002))).toEqual(false);
      (expect(tic.isLeapYear(2003))).toEqual(false);
      (expect(tic.isLeapYear(2004))).toEqual(true);
      return (expect(tic.isLeapYear(2005))).toEqual(false);
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
    it("defaults to days", function() {
      return (expect(tic.add(date, 1))).toEqual(new Date("2.4.2012 01:03:02"));
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
      (expect(tic.add(date, 2, "days"))).toEqual(new Date("2.5.2012 01:03:02"));
      (expect(tic.add(date, 3, "days"))).toEqual(new Date("2.6.2012 01:03:02"));
      (expect(tic.add(date, 4, "days"))).toEqual(new Date("2.7.2012 01:03:02"));
      (expect(tic.add(date, 5, "days"))).toEqual(new Date("2.8.2012 01:03:02"));
      (expect(tic.add(date, 10, "days"))).toEqual(new Date("2.13.2012 01:03:02"));
      (expect(tic.add(date, 20, "days"))).toEqual(new Date("2.23.2012 01:03:02"));
      (expect(tic.add(date, 29, "days"))).toEqual(new Date("3.3.2012 01:03:02"));
      return (expect(tic.add(date, 366, "days"))).toEqual(new Date("2.3.2013 01:03:02"));
    });
    it("knows how to add weeks to a date", function() {
      (expect(tic.add(date, 1, "week"))).toEqual(new Date("2.10.2012 01:03:02"));
      return (expect(tic.add(date, 1, "weeks"))).toEqual(new Date("2.10.2012 01:03:02"));
    });
    it("knows how to add months to a date", function() {
      var cases, k, v, _results;
      cases = {
        "1": "3.3.2012 01:03:02",
        "2": "4.3.2012 01:03:02",
        "3": "5.3.2012 01:03:02",
        "4": "6.3.2012 01:03:02",
        "5": "7.3.2012 01:03:02",
        "6": "8.3.2012 01:03:02",
        "7": "9.3.2012 01:03:02",
        "8": "10.3.2012 01:03:02",
        "9": "11.3.2012 01:03:02",
        "10": "12.3.2012 01:03:02",
        "11": "1.3.2013 01:03:02"
      };
      _results = [];
      for (k in cases) {
        v = cases[k];
        _results.push((expect(tic.add(date, k, "months"))).toEqual(new Date(v)));
      }
      return _results;
    });
    it("adding months over leapyears works as expected", function() {});
    it("knows how to add years to a date", function() {
      (expect(tic.add(date, 1, "year"))).toEqual(new Date("2.3.2013 01:03:02"));
      return (expect(tic.add(date, 1, "years"))).toEqual(new Date("2.3.2013 01:03:02"));
    });
    return it("adding years over leapyears works as expected", function() {
      (expect(tic.add(date, 4, "years"))).toEqual(new Date("2.3.2016 01:03:02"));
      (expect(tic.add(date, 10, "years"))).toEqual(new Date("2.3.2022 01:03:02"));
      (expect(tic.add(date, 100, "years"))).toEqual(new Date("2.3.2112 01:03:02"));
      return (expect(tic.add(date, 1000, "years"))).toEqual(new Date("2.3.3012 01:03:02"));
    });
  });

  describe("tic.remove(date, amount, unit*)", function() {
    it("defaults to days", function() {
      return (expect(tic.remove(date, 1))).toEqual(new Date("2.2.2012 01:03:02"));
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
    it("knows how to remove weeks from a date", function() {
      (expect(tic.remove(date, 1, "week"))).toEqual(new Date("1.27.2012 01:03:02"));
      return (expect(tic.remove(date, 1, "weeks"))).toEqual(new Date("1.27.2012 01:03:02"));
    });
    it("knows how to remove months to a date", function() {
      (expect(tic.remove(date, 1, "month"))).toEqual(new Date("1.3.2012 01:03:02"));
      return (expect(tic.remove(date, 1, "months"))).toEqual(new Date("1.3.2012 01:03:02"));
    });
    it("knows how to remove years to a date", function() {
      (expect(tic.remove(date, 1, "year"))).toEqual(new Date("2.3.2011 01:03:02"));
      return (expect(tic.remove(date, 1, "years"))).toEqual(new Date("2.3.2011 01:03:02"));
    });
    return it("removing years over leapyears works as expected", function() {
      (expect(tic.remove(date, 4, "years"))).toEqual(new Date("2.3.2008 01:03:02"));
      (expect(tic.remove(date, 10, "years"))).toEqual(new Date("2.3.2002 01:03:02"));
      (expect(tic.remove(date, 100, "years"))).toEqual(new Date("2.3.1912 01:03:02"));
      return (expect(tic.remove(date, 1000, "years"))).toEqual(new Date("2.3.1012 01:03:02"));
    });
  });

}).call(this);
