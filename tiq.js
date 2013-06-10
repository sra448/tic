var tiq = (function() {

  // tiq has some languages
  var langs = {
    "en-US": {
      "days"       : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "months"     : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      "monthsShort": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    }
  };

  // change this, if your default language is something else
  var currentLanguage = langs["en-US"];

  // some very basic functions
  var substr = function(str, id, i) {
    return (""+str).substr(id, i);
  };

  var getConfiguredSubstrFn = function(id, i) {
    return function(str) {
      return substr(str, id, i);
    };
  };

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

  var getAttribute = function(obj, attribute) {
    return obj[attribute];
  };

  var getLanguageLookupFn = function(key) {
    return _.partial(getAttribute, currentLanguage[key]);
  };

  var getExecuteOnParamFn = function(fn) {
    return function(obj) {
      return obj[fn]();
    }
  };

  var dateFormatFunctions = {
    "YYYY": getExecuteOnParamFn("getFullYear"),
    "YY"  : _.compose(getConfiguredSubstrFn(2), getExecuteOnParamFn("getFullYear")),
    "MMMM": _.compose(getLanguageLookupFn("months"), getExecuteOnParamFn("getMonth")),
    "MMM" : _.compose(getLanguageLookupFn("monthsShort"), getExecuteOnParamFn("getMonth")),
    "MM"  : _.compose(padNumber, increment, getExecuteOnParamFn("getMonth")),
    "M"   : _.compose(increment, getExecuteOnParamFn("getMonth")),
    "DD"  : _.compose(padNumber, getExecuteOnParamFn("getDate")),
    "D"   : getExecuteOnParamFn("getDate"),
    "dddd": _.compose(getLanguageLookupFn("days"), getExecuteOnParamFn("getDay")),
    "ddd" : _.compose(getConfiguredSubstrFn(0, 3), getLanguageLookupFn("days"), getExecuteOnParamFn("getDay")),
    "dd"  : _.compose(getConfiguredSubstrFn(0, 2), getLanguageLookupFn("days"), getExecuteOnParamFn("getDay")),
    "d"   : getExecuteOnParamFn("getDay"),
    "HH"  : _.compose(padNumber, getExecuteOnParamFn("getHours")),
    "H"   : getExecuteOnParamFn("getHours"),
    "mm"  : _.compose(padNumber, getExecuteOnParamFn("getMinutes")),
    "m"   : getExecuteOnParamFn("getMinutes"),
    "SS"  : _.compose(padNumber, getExecuteOnParamFn("getSeconds")),
    "ss"  : _.compose(padNumber, getExecuteOnParamFn("getSeconds")),
    "S"   : getExecuteOnParamFn("getSeconds"),
    "s"   : getExecuteOnParamFn("getSeconds")
  };

  var parse = function(str) {
    if (typeof str !== "string" || str === "") {
      return new Date();
    }
  };

  var format = function(date, formatStr) {
    return _.reduce(dateFormatFunctions, function(str, fn, rule) {
      // console.log(str, str.match(rule), (str.match(rule) ? str.replace(new RegExp(rule, "g"), fn(date)) : str));
      return (str.match(rule) ? str.replace(new RegExp(rule, "g"), fn(date)) : str);
    }, formatStr || "");
  };

  var isToday = function(date) {
    return format(date, "YYYYMD") === format(new Date(), "YYYYMD");
  };

  var milisecondFactors = {
    "miiseconds": 1,       "miisecond": 1,
    "seconds"   : 1e3,     "second"   : 1e3,
    "minutes"   : 6e4,     "minute"   : 6e4,
    "hours"     : 36e5,    "hour"     : 36e5,
    "days"      : 864e5,   "day"      : 864e5,
    "weeks"     : 6048e5,  "week"     : 6048e5,
    "months"    : 2592e6,  "month"    : 2592e6,
    "years"     : 31536e6, "year"     : 31536e6
  };

  var add = function(date, val, unit) {
    // std unit is seconds
    return new Date(date.getTime() + (val * (unit && milisecondFactors[unit.toLowerCase()] || 1e3)))
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
