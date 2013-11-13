(function() {
  var __slice = [].slice;

  window.tic = (function() {
    var add, apply, compose, currentLanguage, curry, first, foldl, format, formatFunctions, formatFunctionsRegex, formatStrToArray, getAttribute, getConfiguredSubstrFn, getExecuteOnParamFn, getLanguageLookupFn, increment, isToday, keys, langs, last, millisecondFactors, padNumber, parse, parseFormatRegex, parseFunctions, rest, substr, substract;
    langs = {
      "en-US": {
        "stdDateInputFormat": "MMDDYYYY",
        "days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "months": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        "monthsShort": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      }
    };
    currentLanguage = langs["en-US"];
    apply = function(f, args) {
      return f.apply(window, args);
    };
    first = function(xs) {
      if ((xs != null) && xs.length > 0) {
        return xs[0];
      }
    };
    rest = function(xs) {
      if (xs != null) {
        return xs.slice(1);
      }
    };
    last = function(xs) {
      if (xs != null) {
        return xs[xs.length - 1];
      }
    };
    keys = function(obj) {
      var k, v, _results;
      _results = [];
      for (k in obj) {
        v = obj[k];
        _results.push(k);
      }
      return _results;
    };
    curry = function() {
      var args, f;
      f = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return function() {
        var moreArgs;
        moreArgs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return f.apply(this, args.concat(moreArgs));
      };
    };
    compose = function() {
      var fs;
      fs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return function() {
        var args, i, _i, _ref;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        for (i = _i = _ref = fs.length - 1; _ref <= 0 ? _i <= 0 : _i >= 0; i = _ref <= 0 ? ++_i : --_i) {
          args = [apply(fs[i], args)];
        }
        return first(args);
      };
    };
    foldl = function(f, a, _arg) {
      var x, xs;
      x = _arg[0], xs = 2 <= _arg.length ? __slice.call(_arg, 1) : [];
      console.log(x, xs, xs.length === 0);
      if (xs.length === 0) {
        return f(a, x);
      } else {
        return foldl(f, f(a, x), xs);
      }
    };
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
      if (targetLength == null) {
        targetLength = 2;
      }
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
      return curry(getAttribute, currentLanguage[key]);
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
    parseFormatRegex = new RegExp((keys(parseFunctions)).join("|"), "g");
    parse = function(str, formatStr) {
      var applyRule, date, groups;
      if (typeof str === "string") {
        date = new Date();
        groups = (formatStr || "").match(parseFormatRegex);
        applyRule = function(mem, rule) {
          var val;
          val = str.substr(formatStr.indexOf(rule), rule.length);
          if (parseFunctions[rule] != null) {
            return parseFunctions[rule](mem, val);
          } else {
            return mem;
          }
        };
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        if (groups != null) {
          return foldl(applyRule, date, groups);
        } else {
          return date;
        }
      } else if (typeof str === "number") {
        return new Date(str);
      } else {
        return new Date();
      }
    };
    formatFunctions = {
      "YYYY": getExecuteOnParamFn("getFullYear"),
      "YY": compose(getConfiguredSubstrFn(2), getExecuteOnParamFn("getFullYear")),
      "MMMM": compose(getLanguageLookupFn("months"), getExecuteOnParamFn("getMonth")),
      "MMM": compose(getLanguageLookupFn("monthsShort"), getExecuteOnParamFn("getMonth")),
      "MM": compose(padNumber, increment, getExecuteOnParamFn("getMonth")),
      "M": compose(increment, getExecuteOnParamFn("getMonth")),
      "DD": compose(padNumber, getExecuteOnParamFn("getDate")),
      "D": getExecuteOnParamFn("getDate"),
      "dddd": compose(getLanguageLookupFn("days"), getExecuteOnParamFn("getDay")),
      "ddd": compose(getConfiguredSubstrFn(0, 3), getLanguageLookupFn("days"), getExecuteOnParamFn("getDay")),
      "dd": compose(getConfiguredSubstrFn(0, 2), getLanguageLookupFn("days"), getExecuteOnParamFn("getDay")),
      "d": getExecuteOnParamFn("getDay"),
      "HH": compose(padNumber, getExecuteOnParamFn("getHours")),
      "H": getExecuteOnParamFn("getHours"),
      "mm": compose(padNumber, getExecuteOnParamFn("getMinutes")),
      "m": getExecuteOnParamFn("getMinutes"),
      "SS": compose(padNumber, getExecuteOnParamFn("getSeconds")),
      "ss": compose(padNumber, getExecuteOnParamFn("getSeconds")),
      "S": getExecuteOnParamFn("getSeconds"),
      "s": getExecuteOnParamFn("getSeconds")
    };
    formatFunctionsRegex = new RegExp((keys(formatFunctions)).join("|"));
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
          _results.push(formatFunctions[g] != null ? formatFunctions[g](date) : g);
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
