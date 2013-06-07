describe('tiq.parse', function() {

  it("returns a date object of the current date, given an empty string", function() {
    expect(tiq.parse("")).toEqual(new Date());
  });

  it("returns a date object, given a date string", function() {
    expect(tiq.parse("Thu Jun 06 2013 19:40:02 GMT+0200 (CEST)")).toEqual(new Date("Thu Jun 06 2013 19:40:02 GMT+0200 (CEST)"));
  });

  it("returns a date object with ", function() {
    expect(tiq.parse("06.06.2013")).toEqual(new Date("Thu Jun 06 2013 00:00:00 GMT+0200 (CEST)"));
    expect(tiq.parse("6.6.2013")).toEqual(new Date("Thu Jun 06 2013 00:00:00 GMT+0200 (CEST)"));
    expect(tiq.parse("20.6.2013")).toEqual(new Date("Thu Jun 20 2013 00:00:00 GMT+0200 (CEST)"));
  });

  it("returns a date object, given a date strding", function() {
    expect(tiq.parse("Thu Jun 06 2013 19:40:02 GMT+0200 (CEST)")).toEqual(new Date("Thu Jun 06 2013 19:40:02 GMT+0200 (CEST)"));
  });

});
