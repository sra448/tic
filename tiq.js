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

  var formatFunctions = {
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
    "S"   : executeOnParam("getSeconds"),
    "ss"  : _.compose(padNumber, executeOnParam("getSeconds")),
    "s"   : executeOnParam("getSeconds")
  };

  return {

    parse: function(str) {
      if (typeof str !== "string" || str === "") {
        return new Date();
      }
    },

    format: function(date, formatStr) {
      var usedRules = _.reduce(formatFunctions, function(mem, fn, rule) {
        if (formatStr.match(rule)) {
          mem[rule] = fn
        }
        return mem;
      }, {});

      _.each(usedRules, function(fn, rule) {
        formatStr = formatStr.replace(new RegExp(rule, "g"), fn(date));
      });

      return formatStr;
    }

  };

})();
