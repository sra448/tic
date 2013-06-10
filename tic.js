var tic = (function() {

  // tic has some languages
  var langs = {
    "en-US": {
      "stdDateInputFormat": "MMDDYYYY",
      "days"              : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "months"            : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      "monthsShort"       : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
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

  var parseFunctions = {
    "YYYY": function(date, val) { return new Date(date.setYear(val)); },
    "YY"  : function(date, val) { return new Date(date.setYear("20"+val)); },
    "MM"  : function(date, val) { return new Date(date.setMonth(+val-1)); },
    "M"   : function(date, val) { return new Date(date.setMonth(+val-1)); },
    "DD"  : function(date, val) { return new Date(date.setDate(val)); },
    "D"   : function(date, val) { return new Date(date.setDate(val)); },
    "HH"  : function(date, val) { return new Date(date.setHours(val)); },
    "H"   : function(date, val) { return new Date(date.setHours(val)); },
    "mm"  : function(date, val) { return new Date(date.setMinutes(val)); },
    "m"   : function(date, val) { return new Date(date.setMinutes(val)); }
  };

  var parseFormatRegex = new RegExp(_.keys(parseFunctions).join("|"), "g");

  var parse = function(str, formatStr) {
    if (typeof str === "string") {
      var date = new Date(),
          groups = (formatStr || "").match(parseFormatRegex);

      // the default date is today at 00:00:00
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);

      // apply all the rules from formatStr to our date
      date = _.reduce(groups, function(mem, rule) {
        var val = str.substr(formatStr.indexOf(rule), rule.length);
        return parseFunctions[rule] !== undefined ? parseFunctions[rule](mem, val) : mem;
      }, date);

      return date;
    } else if (typeof str === "number") {
      // if not given a number, pass right into a new Date object
      return new Date(str);
    } else {
      // if we dont know better, we just return a the current date
      return new Date();
    }
  };

  var formatFunctions = {
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

  var formatFunctionsRegex = new RegExp(_.keys(formatFunctions).join("|"));

  var formatStrToArray = function(formatStr) {
    if (formatFunctionsRegex.test(formatStr)) {
      var group = formatStr.match(formatFunctionsRegex)[0],
          groupId = formatStr.indexOf(group),
          preGroup = groupId !== 0 ? formatStr.substr(0, groupId) : undefined,
          newFormatStr = formatStr.substr(groupId + group.length);

      return (preGroup ? [preGroup, group] : [group]).concat(formatStrToArray(newFormatStr))
    } else {
      return [formatStr];
    }
  };

  var format = function(date, formatStr) {
    return _.map(formatStrToArray(formatStr), function(group) {
      return formatFunctions[group] !== undefined ? formatFunctions[group](date) : group;
    }).join("");
  };

  var isToday = function(date) {
    return format(date, "YYYYMD") === format(new Date(), "YYYYMD");
  };

  var millisecondFactors = {
    "milliseconds": 1,       "millisecond": 1,
    "seconds"     : 1e3,     "second"   : 1e3,
    "minutes"     : 6e4,     "minute"   : 6e4,
    "hours"       : 36e5,    "hour"     : 36e5,
    "days"        : 864e5,   "day"      : 864e5,
    "weeks"       : 6048e5,  "week"     : 6048e5,
    "months"      : 2592e6,  "month"    : 2592e6,
    "years"       : 31536e6, "year"     : 31536e6
  };

  var add = function(date, val, unit) {
    // std unit is seconds
    return new Date(date.getTime() + (val * (unit && millisecondFactors[unit.toLowerCase()] || 1e3)))
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
