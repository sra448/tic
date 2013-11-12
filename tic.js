(function() {
  var tic;

  tic = (function() {
    var add, currentLanguage, format, formatFunctions, formatFunctionsRegex, formatStrToArray, getAttribute, getConfiguredSubstrFn, getExecuteOnParamFn, getLanguageLookupFn, increment, isToday, langs, millisecondFactors, padNumber, parse, parseFormatRegex, parseFunctions, substr, substract;
    langs = {
      "en-US": {
        "stdDateInputFormat": "MMDDYYYY",
        "days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "months": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        "monthsShort": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      }
    };
    currentLanguage = langs["en-US"];
    substr = function(str, id, i) {
      return ("" + str).substr(id, i);
    };
    getConfiguredSubstrFn = function(id, i) {
      return function(str) {
        return substr(str, id, i);
      };
    };
    increment = function(num) {
      return num + 1;
    };
    padNumber = function(num, targetLength) {
      if ((num + "").length < targetLength) {
        return padNumber("0" + num, targetLength);
      } else {
        return num + "";
      }
    };
    getAttribute = function(obj, attribute) {
      return obj[attribute];
    };
    getLanguageLookupFn = function(key) {
      return _.partial(getAttribute, currentLanguage[key]);
    };
    getExecuteOnParamFn = function(fn) {
      return function(obj) {
        return obj[fn]();
      };
    };
    parseFunctions = {
      "YYYY": function(date, val) {
        return new Date(date.setYear(val));
      },
      "YY": function(date, val) {
        return new Date(date.setYear("20" + val));
      },
      "MM": function(date, val) {
        return new Date(date.setMonth(+val - 1));
      },
      "M": function(date, val) {
        return new Date(date.setMonth(+val - 1));
      },
      "DD": function(date, val) {
        return new Date(date.setDate(val));
      },
      "D": function(date, val) {
        return new Date(date.setDate(val));
      },
      "HH": function(date, val) {
        return new Date(date.setHours(val));
      },
      "H": function(date, val) {
        return new Date(date.setHours(val));
      },
      "mm": function(date, val) {
        return new Date(date.setMinutes(val));
      },
      "m": function(date, val) {
        return new Date(date.setMinutes(val));
      }
    };
    parseFormatRegex = new RegExp((_.keys(parseFunctions)).join("|"), "g");
    parse = function(str, formatStr) {
      var date, groups;
      if (typeof str === "string") {
        date = new Date();
        groups = (formatStr || "").match(parseFormatRegex);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return _.reduce(groups, function(mem, rule) {
          var val;
          val = str.substr(formatStr.indexOf(rule), rule.length);
          if (parseFunctions[rule] != null) {
            return parseFunctions[rule](mem, val);
          } else {
            return mem;
          }
        }, date);
      } else if (typeof str === "number") {
        return new Date(str);
      } else {
        return new Date();
      }
    };
    formatFunctions = {
      "YYYY": getExecuteOnParamFn("getFullYear"),
      "YY": _.compose(getConfiguredSubstrFn(2), getExecuteOnParamFn("getFullYear")),
      "MMMM": _.compose(getLanguageLookupFn("months"), getExecuteOnParamFn("getMonth")),
      "MMM": _.compose(getLanguageLookupFn("monthsShort"), getExecuteOnParamFn("getMonth")),
      "MM": _.compose(padNumber, increment, getExecuteOnParamFn("getMonth")),
      "M": _.compose(increment, getExecuteOnParamFn("getMonth")),
      "DD": _.compose(padNumber, getExecuteOnParamFn("getDate")),
      "D": getExecuteOnParamFn("getDate"),
      "dddd": _.compose(getLanguageLookupFn("days"), getExecuteOnParamFn("getDay")),
      "ddd": _.compose(getConfiguredSubstrFn(0, 3), getLanguageLookupFn("days"), getExecuteOnParamFn("getDay")),
      "dd": _.compose(getConfiguredSubstrFn(0, 2), getLanguageLookupFn("days"), getExecuteOnParamFn("getDay")),
      "d": getExecuteOnParamFn("getDay"),
      "HH": _.compose(padNumber, getExecuteOnParamFn("getHours")),
      "H": getExecuteOnParamFn("getHours"),
      "mm": _.compose(padNumber, getExecuteOnParamFn("getMinutes")),
      "m": getExecuteOnParamFn("getMinutes"),
      "SS": _.compose(padNumber, getExecuteOnParamFn("getSeconds")),
      "ss": _.compose(padNumber, getExecuteOnParamFn("getSeconds")),
      "S": getExecuteOnParamFn("getSeconds"),
      "s": getExecuteOnParamFn("getSeconds")
    };
    formatFunctionsRegex = new RegExp((_.keys(formatFunctions)).join("|"));
    formatStrToArray = function(formatStr) {
      var group, groupId, newFormatStr, preGroup;
      if (formatFunctionsRegex.test(formatStr)) {
        group = (formatStr.match(formatFunctionsRegex))[0];
        groupId = formatStr.indexOf(group);
        if (groupId !== 0) {
          preGroup = formatStr.substr(0, groupId);
        }
        newFormatStr = formatStr.substr(groupId + group.length);
        return (preGroup != null ? [preGroup, group] : [group]).concat(formatStrToArray(newFormatStr));
      } else {
        return [formatStr];
      }
    };
    format = function(date, formatStr) {
      var g;
      return ((function() {
        var _i, _len, _ref, _results;
        _ref = formatStrToArray(formatStr);
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          g = _ref[_i];
          _results.push(formatFunctions[group] != null ? formatFunctions[group](date) : group);
        }
        return _results;
      })()).join("");
    };
    isToday = function(date) {
      return (format(date, "YYYYMD")) === (format(new Date(), "YYYYMD"));
    };
    millisecondFactors = {
      "millisecond": 1,
      "second": 1e3,
      "minute": 6e4,
      "hour": 36e5,
      "day": 864e5,
      "week": 6048e5,
      "month": 2592e6,
      "year": 31536e6
    };
    add = function(date, val, unit) {
      return new Date(date.getTime() + (val * (unit && millisecondFactors[unit.toLowerCase()] || 1e3)));
    };
    substract = function(date, val, unit) {
      return add(date, -val, unit);
    };
    return {
      parse: parse,
      format: format,
      add: add,
      substract: substract,
      isToday: isToday
    };
  })();

}).call(this);
