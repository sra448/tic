var tiq = (function() {

  var increment = function(num) {
    return num + 1;
  };

  var padNumber = function(num, targetLength) {
    var numStr = num + '';
    while (numStr.length < (targetLength || 2)) {
      numStr = "0" + numStr;
    }
    return numStr;
  };

  var executeOnParam = function(fn) {
    return function(obj) {
      return obj[fn]();
    }
  };

  var dateFormatFunctions = {
    "YYYY": executeOnParam("getFullYear"),
    "YY"  : function(date) { return (""+date.getFullYear()).substr(2); },
    "MM"  : _.compose(padNumber, increment, executeOnParam("getMonth")),
    "M"   : _.compose(increment, executeOnParam("getMonth")),
    "DD"  : _.compose(padNumber, executeOnParam("getDate")),
    "D"   : executeOnParam("getDate"),
    "d"   : executeOnParam("getDay"),
    "HH"  : _.compose(padNumber, executeOnParam("getHours")),
    "H"   : executeOnParam("getHours"),
    "mm"  : _.compose(padNumber, executeOnParam("getMinutes")),
    "m"   : executeOnParam("getMinutes"),
    "SS"  : _.compose(padNumber, executeOnParam("getSeconds")),
    "ss"  : _.compose(padNumber, executeOnParam("getSeconds")),
    "S"   : executeOnParam("getSeconds"),
    "s"   : executeOnParam("getSeconds")
  };

  var parse = function(str) {
    if (typeof str !== "string" || str === "") {
      return new Date();
    }
  };

  var format = function(date, formatStr) {
    return _.reduce(dateFormatFunctions, function(str, fn, rule) {
      return (str.match(rule) ? str.replace(new RegExp(rule, "g"), fn(date)) : str);
    }, formatStr || "");
  };

  var isToday = function(date) {
    return format(date, "YYYYMD") === format(new Date(), "YYYYMD");
  };

  var milisecondFactor = {
    "miiseconds": 1,
    "seconds"   : 1e3,
    "minutes"   : 6e4,
    "hours"     : 36e5,
    "days"      : 864e5,
    "weeks"     : 6048e5,
    "months"    : 2592e6,
    "years"     : 31536e6
  };

  var add = function(date, val, unit) {
    // std unit is second
    return new Date(date.getTime() + (val * (unit && milisecondFactor[unit.toLowerCase()] || 1e3)))
  };

  var substract = function(date, val, unit) {
    return add(date, -val, unit);
  };

  var isToday = function(date) {
    return format(date, "YYYYMD") === format(new Date(), "YYYYMD");
  };

  return {
    parse: parse,
    format: format,
    add: add,
    substract: substract,
    isToday: isToday
  };

})();
