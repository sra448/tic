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
  it("handles YYYY", function() { expect(tiq.format(date, "YYYY")).toEqual("2012"); });
  it("handles YY", function() { expect(tiq.format(date, "YY")).toEqual("12"); });
  it("handles MMMM", function() { expect(tiq.format(date, "MMMM")).toEqual("February"); });
  it("handles MMM", function() { expect(tiq.format(date, "MMM")).toEqual("Feb"); });
  it("handles MM", function() { expect(tiq.format(date, "MM")).toEqual("02"); });
  it("handles M", function() { expect(tiq.format(date, "M")).toEqual("2"); });
  it("handles DD", function() { expect(tiq.format(date, "DD")).toEqual("03"); });
  it("handles D", function() { expect(tiq.format(date, "D")).toEqual("3"); });
  it("handles dddd", function() { expect(tiq.format(date, "dddd")).toEqual("Friday"); });
  it("handles ddd", function() { expect(tiq.format(date, "ddd")).toEqual("Fri"); });
  it("handles dd", function() { expect(tiq.format(date, "dd")).toEqual("Fr"); });
  it("handles d", function() { expect(tiq.format(date, "d")).toEqual("5"); });
  it("handles HH", function() { expect(tiq.format(date, "HH")).toEqual("01"); });
  it("handles H", function() { expect(tiq.format(date, "H")).toEqual("1"); });
  it("handles mm", function() { expect(tiq.format(date, "mm")).toEqual("03"); });
  it("handles m", function() { expect(tiq.format(date, "m")).toEqual("3"); });
  it("handles SS", function() { expect(tiq.format(date, "SS")).toEqual("02"); });
  it("handles S", function() { expect(tiq.format(date, "S")).toEqual("2"); });
  it("handles ss", function() { expect(tiq.format(date, "ss")).toEqual("02"); });
  it("handles s", function() { expect(tiq.format(date, "s")).toEqual("2"); });

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
