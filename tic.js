(function() {
  var __slice = [].slice;

  window.tic = (function() {
    var add, addDays, addHours, addLeapDaysR, addMilliseconds, addMinutes, addMonths, addSeconds, addWeeks, addYears, apply, clone, compact, compare, compose, curry, daysForMonths, decrement, dot, dotExec, drop, equals, first, foldl, format, formatFunctions, formatFunctionsRegex, formatStrGroups, getConfiguredSubstrFn, getLanguageLookupFn, increment, isBeforeMarch1, isDST, isFuture, isLeapYear, isPast, isToday, keys, lang, langs, leapDaysBetween, msFactors, padNumber, parse, parseFormatRegex, parseFunctions, remove, repeat, resetTime, stdTimezoneOffset, substr, take;
    langs = {
      "en-US": {
        stdDateFormat: "MM/DD/YYYY",
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      }
    };
    lang = langs["en-US"];
    apply = function(f, args, obj) {
      if (obj == null) {
        obj = window;
      }
      return f.apply(obj, args);
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
      if (xs.length === 0) {
        return f(a, x);
      } else {
        return foldl(f, f(a, x), xs);
      }
    };
    first = function(xs) {
      if ((xs != null) && xs.length > 0) {
        return xs[0];
      }
    };
    take = function(xs, t) {
      return xs.slice(t);
    };
    drop = function(xs, t) {
      return xs.splice(t);
    };
    repeat = function(xs, t) {
      var i, l, _i, _ref, _results;
      l = xs.length - 1;
      _results = [];
      for (i = _i = 0, _ref = t - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        _results.push(xs[i % l]);
      }
      return _results;
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
    compact = function(xs) {
      var x, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = xs.length; _i < _len; _i++) {
        x = xs[_i];
        if (x != null) {
          _results.push(x);
        }
      }
      return _results;
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
    dot = function(obj, attribute) {
      return obj[attribute];
    };
    dotExec = function(p) {
      return function(obj) {
        return obj[p]();
      };
    };
    getLanguageLookupFn = function(key) {
      return curry(dot, lang[key]);
    };
    clone = function(d) {
      return new Date(d);
    };
    resetTime = function(date, time) {
      var d, h, m, ms, s, _ref;
      if (time == null) {
        time = "";
      }
      _ref = time.split(":"), h = _ref[0], m = _ref[1], s = _ref[2], ms = _ref[3];
      d = clone(date);
      d.setHours(h || 0);
      d.setMinutes(m || 0);
      d.setSeconds(s || 0);
      d.setMilliseconds(ms || 0);
      return d;
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
      },
      "SS": function(date, val) {
        return new Date(date.setSeconds(val));
      },
      "S": function(date, val) {
        return new Date(date.setSeconds(val));
      },
      "ss": function(date, val) {
        return new Date(date.setSeconds(val));
      },
      "s": function(date, val) {
        return new Date(date.setSeconds(val));
      }
    };
    parseFormatRegex = new RegExp((keys(parseFunctions)).join("|"), "g");
    parse = function(str, formatStr) {
      var applyRule, date, parseRules;
      if (str == null) {
        str = "";
      }
      if (formatStr == null) {
        formatStr = lang.stdDateFormat;
      }
      if (str === "") {
        return new Date();
      } else {
        switch (typeof str) {
          case "string":
            date = resetTime(new Date());
            parseRules = formatStr.match(parseFormatRegex);
            applyRule = function(date, rule) {
              var val;
              val = str.substr(formatStr.indexOf(rule), rule.length);
              if (parseFunctions[rule] != null) {
                return parseFunctions[rule](date, val);
              } else {
                return date;
              }
            };
            if (parseRules != null) {
              return foldl(applyRule, date, parseRules);
            } else {
              return date;
            }
            break;
          case "number":
            return new Date(str);
          default:
            return new Date();
        }
      }
    };
    formatFunctions = {
      "YYYY": dotExec("getFullYear"),
      "YY": compose(getConfiguredSubstrFn(2), dotExec("getFullYear")),
      "MMMM": compose(getLanguageLookupFn("months"), dotExec("getMonth")),
      "MMM": compose(getLanguageLookupFn("monthsShort"), dotExec("getMonth")),
      "MM": compose(padNumber, increment, dotExec("getMonth")),
      "M": compose(increment, dotExec("getMonth")),
      "DD": compose(padNumber, dotExec("getDate")),
      "D": dotExec("getDate"),
      "dddd": compose(getLanguageLookupFn("days"), dotExec("getDay")),
      "ddd": compose(getConfiguredSubstrFn(0, 3), getLanguageLookupFn("days"), dotExec("getDay")),
      "dd": compose(getConfiguredSubstrFn(0, 2), getLanguageLookupFn("days"), dotExec("getDay")),
      "d": dotExec("getDay"),
      "HH": compose(padNumber, dotExec("getHours")),
      "H": dotExec("getHours"),
      "mm": compose(padNumber, dotExec("getMinutes")),
      "m": dotExec("getMinutes"),
      "SS": compose(padNumber, dotExec("getSeconds")),
      "ss": compose(padNumber, dotExec("getSeconds")),
      "S": dotExec("getSeconds"),
      "s": dotExec("getSeconds")
    };
    formatFunctionsRegex = new RegExp((keys(formatFunctions)).join("|"));
    formatStrGroups = function(formatStr) {
      var group, groupId, newFormatStr, preGroup;
      if (formatFunctionsRegex.test(formatStr)) {
        group = (formatStr.match(formatFunctionsRegex))[0];
        groupId = formatStr.indexOf(group);
        if (groupId !== 0) {
          preGroup = formatStr.substr(0, groupId);
        }
        newFormatStr = formatStr.substr(groupId + group.length);
        return (preGroup != null ? [preGroup, group] : [group]).concat(formatStrGroups(newFormatStr));
      } else {
        return [formatStr];
      }
    };
    format = function(date, formatStr) {
      var g;
      if (formatStr == null) {
        formatStr = lang.stdDateFormat;
      }
      return ((function() {
        var _i, _len, _ref, _results;
        _ref = formatStrGroups(formatStr);
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          g = _ref[_i];
          _results.push(formatFunctions[g] != null ? formatFunctions[g](date) : g);
        }
        return _results;
      })()).join("");
    };
    compare = function(a, b, precision) {
      if (precision == null) {
        if (a < b) {
          return 1;
        } else {
          if (a > b) {
            return -1;
          } else {
            return 0;
          }
        }
      } else {
        switch (precision) {
          case "y":
          case "year":
          case "years":
            return compare(a, b, "YYYY");
          case "m":
          case "month":
          case "months":
            return compare(a, b, "YYYYMM");
          case "d":
          case "day":
          case "days":
            return compare(a, b, "YYYYMMDD");
          case "h":
          case "hour":
          case "hours":
            return compare(a, b, "YYYYMMDDHH");
          case "min":
          case "minute":
          case "minutes":
            return compare(a, b, "YYYYMMDDHHmm");
          case "s":
          case "second":
          case "seconds":
            return compare(a, b, "YYYYMMDDHHmmSS");
          default:
            return compare(+(format(a, precision)), +(format(b, precision)));
        }
      }
    };
    equals = function(a, b, precision) {
      return (compare(a, b, precision)) === 0;
    };
    isPast = function(date, precision) {
      if (precision == null) {
        precision = "d";
      }
      return (compare(new Date(), date, precision)) < 0;
    };
    isToday = function(date, precision) {
      if (precision == null) {
        precision = "d";
      }
      return (compare(new Date(), date, precision)) === 0;
    };
    isFuture = function(date, precision) {
      if (precision == null) {
        precision = "d";
      }
      return (compare(new Date(), date, precision)) > 0;
    };
    stdTimezoneOffset = function(date) {
      var jan, jul;
      jan = new Date(date.getFullYear(), 0, 1);
      jul = new Date(date.getFullYear(), 6, 1);
      return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
    };
    isDST = function(date) {
      return date.getTimezoneOffset() < (stdTimezoneOffset(date));
    };
    isBeforeMarch1 = function(d) {
      if (d.getMonth != null) {
        return d.getMonth() < 2;
      }
    };
    isLeapYear = function(d) {
      var y;
      y = d.getFullYear != null ? d.getFullYear() : +d;
      return y % 400 === 0 || (y % 4 === 0 && y % 100 !== 0);
    };
    leapDaysBetween = function(date1, date2) {
      var y, y1, y2, _ref;
      if (date1 > date2) {
        _ref = [date2, date1], date1 = _ref[0], date2 = _ref[1];
      }
      y1 = date1.getFullYear();
      if (!(isBeforeMarch1(date1))) {
        y1 = y1 + 1;
      }
      y2 = date2.getFullYear();
      if (isBeforeMarch1(date2)) {
        y2 = y2 - 1;
      }
      if (!(y2 < y1)) {
        return foldl((function(a, b) {
          return a + b;
        }), 0, (function() {
          var _i, _results;
          _results = [];
          for (y = _i = y1; y1 <= y2 ? _i <= y2 : _i >= y2; y = y1 <= y2 ? ++_i : --_i) {
            _results.push(isLeapYear(y) ? 1 : 0);
          }
          return _results;
        })());
      } else {
        return 0;
      }
    };
    addLeapDaysR = function(d1, d2, dir) {
      var a, ld;
      if (dir == null) {
        dir = 1;
      }
      a = new Date((dir > 0 ? Math.max(d1, d2) : Math.min(d1, d2)));
      ld = (leapDaysBetween(d1, d2)) * dir;
      if (ld === 0) {
        return a;
      } else {
        return addLeapDaysR(a, add(a, ld, "days"), dir);
      }
    };
    msFactors = {
      "millisecond": 1,
      "second": 1e3,
      "minute": 6e4,
      "hour": 36e5,
      "day": 864e5,
      "week": 6048e5,
      "year": 31536e6
    };
    addYears = function(date, amount) {
      var d;
      d = addMilliseconds(date, amount * msFactors.year);
      d = addLeapDaysR(date, d, amount / (Math.abs(amount)));
      return resetTime(d, format(date, "HH:mm:SS"));
    };
    daysForMonths = function(m, mc) {
      var days;
      days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if (mc < 0) {
        days = days.reverse();
        m = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].reverse()[m] - 1;
      }
      return drop(repeat(days, (Math.abs(mc)) + m), m);
    };
    addMonths = function(date, amount) {
      var d, days, factor;
      factor = amount / (Math.abs(amount));
      days = foldl((function(a, b) {
        return a + b;
      }), 0, daysForMonths(date.getMonth(), amount));
      d = addLeapDaysR(date, addDays(date, days * factor), factor);
      return resetTime(d, format(date, "HH:mm:SS"));
    };
    addWeeks = function(date, amount) {
      var d;
      d = addMilliseconds(date, amount * msFactors.week);
      return resetTime(d, format(date, "HH:mm:SS"));
    };
    addDays = function(date, amount) {
      var d;
      d = addMilliseconds(date, amount * msFactors.day);
      return resetTime(d, format(date, "HH:mm:SS"));
    };
    addHours = function(date, amount) {
      return addMilliseconds(date, amount * msFactors.hour);
    };
    addMinutes = function(date, amount) {
      return addMilliseconds(date, amount * msFactors.minute);
    };
    addSeconds = function(date, amount) {
      return addMilliseconds(date, amount * msFactors.second);
    };
    addMilliseconds = function(date, amount) {
      return new Date(date.getTime() + amount);
    };
    add = function(date, amount, unit) {
      if (unit == null) {
        unit = "d";
      }
      switch (unit) {
        case "y":
        case "year":
        case "years":
          return addYears(date, +amount);
        case "m":
        case "month":
        case "months":
          return addMonths(date, +amount);
        case "w":
        case "week":
        case "weeks":
          return addWeeks(date, +amount);
        case "d":
        case "day":
        case "days":
          return addDays(date, +amount);
        case "h":
        case "hour":
        case "hours":
          return addHours(date, +amount);
        case "min":
        case "minute":
        case "minutes":
          return addMinutes(date, +amount);
        case "s":
        case "second":
        case "seconds":
          return addSeconds(date, +amount);
        default:
          return addMilliseconds(date, +amount);
      }
    };
    remove = function(date, amount, unit) {
      return add(date, -amount, unit);
    };
    increment = function(date, amount, unit) {
      return add(date, 1, unit);
    };
    decrement = function(date, amount, unit) {
      return add(date, -1, unit);
    };
    return {
      compare: compare,
      equals: equals,
      resetTime: resetTime,
      parse: parse,
      format: format,
      add: add,
      increment: increment,
      remove: remove,
      decrement: decrement,
      isToday: isToday,
      isLeapYear: isLeapYear,
      isDST: isDST
    };
  })();

}).call(this);
