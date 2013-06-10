describe('tiq.parse', function() {

  it("returns a date object of the current date, given an empty string", function() {
    expect(tiq.parse("")).toEqual(new Date());
  });

  // it("returns a date object, given a date string", function() {
  //   expect(tiq.parse("Thu Jun 06 2013 19:40:02 GMT+0200 (CEST)")).toEqual(new Date("Thu Jun 06 2013 19:40:02 GMT+0200 (CEST)"));
  // });

  // it("returns a date object with ", function() {
  //   expect(tiq.parse("06.06.2013")).toEqual(new Date("Thu Jun 06 2013 00:00:00 GMT+0200 (CEST)"));
  //   expect(tiq.parse("6.6.2013")).toEqual(new Date("Thu Jun 06 2013 00:00:00 GMT+0200 (CEST)"));
  //   expect(tiq.parse("20.6.2013")).toEqual(new Date("Thu Jun 20 2013 00:00:00 GMT+0200 (CEST)"));
  // });

  // it("returns a date object, given a date strding", function() {
  //   expect(tiq.parse("Thu Jun 06 2013 19:40:02 GMT+0200 (CEST)")).toEqual(new Date("Thu Jun 06 2013 19:40:02 GMT+0200 (CEST)"));
  // });

});

describe('tiq.format', function() {

  var date = new Date("2.3.2012 01:03:02");

  it('knows the rules', function() {

    expect(tiq.format(date, "YYYY")).toEqual("2012");
    expect(tiq.format(date, "YY")).toEqual("12");
    expect(tiq.format(date, "MMMM")).toEqual("February");
    expect(tiq.format(date, "MMM")).toEqual("Feb");
    expect(tiq.format(date, "MM")).toEqual("02");
    expect(tiq.format(date, "M")).toEqual("2");
    // expect(tiq.format(date, "DDD")).toEqual("2"); not yet implemented (dayOfYear)
    expect(tiq.format(date, "DD")).toEqual("03");
    expect(tiq.format(date, "D")).toEqual("3");
    expect(tiq.format(date, "dddd")).toEqual("Friday");
    expect(tiq.format(date, "ddd")).toEqual("Fri");
    expect(tiq.format(date, "dd")).toEqual("Fr");
    expect(tiq.format(date, "d")).toEqual("5");
    expect(tiq.format(date, "HH")).toEqual("01");
    expect(tiq.format(date, "H")).toEqual("1");
    expect(tiq.format(date, "mm")).toEqual("03");
    expect(tiq.format(date, "m")).toEqual("3");
    expect(tiq.format(date, "SS")).toEqual("02");
    expect(tiq.format(date, "S")).toEqual("2");
    expect(tiq.format(date, "ss")).toEqual("02");
    expect(tiq.format(date, "s")).toEqual("2");

  });

});

describe('tiq.isToday', function() {

  var date = new Date("2.3.2012 01:03:02");

  it('knows if it is today', function() {
    expect(tiq.isToday(date)).toEqual(false);
    expect(tiq.isToday(new Date())).toEqual(true);
  });

});

describe('tiq.add / tiq.remove', function() {

  var date = new Date("1.1.2012 01:01:01");

  it('know how to add time to a date', function() {
    expect(tiq.format(tiq.add(date, 1, 'days'), "DD")).toEqual("02");
    // expect(tiq.format(tiq.add(date, 1, 'year'), "YYYY")).toEqual("2013");
  });

});
