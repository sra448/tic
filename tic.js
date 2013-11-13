(function() {
  var __slice = [].slice;

  window.tic = (function() {
    var add, apply, clone, compose, curry, dotExec, first, foldl, format, formatFunctions, formatFunctionsRegex, formatStrGroups, getAttribute, getConfiguredSubstrFn, getLanguageLookupFn, increment, isToday, keys, lang, langs, millisecondFactors, padNumber, parse, parseFormatRegex, parseFunctions, remove, resetTime, substr;
    langs = {
      "en-US": {
        "stdDateFormat": "MM/DD/YYYY",
        "days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "months": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        "monthsShort": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      }
    };
    lang = langs["en-US"];
    apply = function(f, args) {
      return f.apply(window, args);
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
    keys = function(obj) {
      var k, v, _results;
      _results = [];
      for (k in obj) {
        v = obj[k];
        _results.push(k);
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
    getAttribute = function(obj, attribute) {
      return obj[attribute];
    };
    getLanguageLookupFn = function(key) {
      return curry(getAttribute, lang[key]);
    };
    dotExec = function(p) {
      return function(obj) {
        return obj[p]();
      };
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
    isToday = function(date) {
      return (format(date, "YYYYMD")) === (format(new Date(), "YYYYMD"));
    };
    millisecondFactors = {
      "milliseconds": 1,
      "seconds": 1e3,
      "minutes": 6e4,
      "hours": 36e5,
      "days": 864e5,
      "weeks": 6048e5,
      "months": 2592e6,
      "years": 31536e6
    };
    add = function(date, val, unit) {
      var factor;
      if (unit == null) {
        unit = "second";
      }
      factor = millisecondFactors[unit] || millisecondFactors[unit + "s"] || 1e3;
      return new Date(date.getTime() + (val * factor));
    };
    remove = function(date, val, unit) {
      return add(date, -val, unit);
    };
    return {
      resetTime: resetTime,
      parse: parse,
      format: format,
      add: add,
      remove: remove,
      isToday: isToday
    };
  })();

}).call(this);
