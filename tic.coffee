window.tic = do ->

  # tic has some languages
  langs =
    "en-US":
      "stdDateInputFormat": "MMDDYYYY",
      "days"              : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
      "months"            : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      "monthsShort"       : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  # change this, if your default language is something else
  currentLanguage = langs["en-US"]

  # some very basic functions
  substr = (str, id, i) -> ("" + str).substr id, i

  getConfiguredSubstrFn = (id, i) -> (str) -> substr str, id, i

  increment = (num) -> num + 1

  padNumber = (num, targetLength) ->
    if (num+"").length < targetLength then padNumber "0#{num}", targetLength else num+""

  getAttribute = (obj, attribute) -> obj[attribute]

  getLanguageLookupFn = (key) -> _.partial getAttribute, currentLanguage[key]

  getExecuteOnParamFn = (fn) -> (obj) -> obj[fn]()

  parseFunctions =
    "YYYY": (date, val) -> (new Date (date.setYear val))
    "YY"  : (date, val) -> (new Date (date.setYear "20"+val))
    "MM"  : (date, val) -> (new Date (date.setMonth +val-1))
    "M"   : (date, val) -> (new Date (date.setMonth +val-1))
    "DD"  : (date, val) -> (new Date (date.setDate val))
    "D"   : (date, val) -> (new Date (date.setDate val))
    "HH"  : (date, val) -> (new Date (date.setHours val))
    "H"   : (date, val) -> (new Date (date.setHours val))
    "mm"  : (date, val) -> (new Date (date.setMinutes val))
    "m"   : (date, val) -> (new Date (date.setMinutes val))

  parseFormatRegex = new RegExp ((_.keys parseFunctions).join "|"), "g"

  parse = (str, formatStr) ->
    if typeof str == "string"
      date = new Date()
      groups = (formatStr || "").match parseFormatRegex

      # the default date is today at 00:00:00
      date.setHours 0
      date.setMinutes 0
      date.setSeconds 0
      date.setMilliseconds 0

      # apply all the rules from formatStr to our date
      _.reduce groups, (mem, rule) ->
        val = str.substr(formatStr.indexOf(rule), rule.length)
        if parseFunctions[rule]? then parseFunctions[rule] mem, val else mem
      , date

    else if typeof str == "number"
      # if not given a number, pass right into a new Date object
      return new Date str

    else
      # if we dont know better, we just return a the current date
      return new Date()

  formatFunctions =
    "YYYY": getExecuteOnParamFn "getFullYear"
    "YY"  : _.compose (getConfiguredSubstrFn 2), (getExecuteOnParamFn "getFullYear")
    "MMMM": _.compose (getLanguageLookupFn "months"), (getExecuteOnParamFn "getMonth")
    "MMM" : _.compose (getLanguageLookupFn "monthsShort"), (getExecuteOnParamFn "getMonth")
    "MM"  : _.compose padNumber, increment, (getExecuteOnParamFn "getMonth")
    "M"   : _.compose increment, (getExecuteOnParamFn "getMonth")
    "DD"  : _.compose padNumber, (getExecuteOnParamFn "getDate")
    "D"   : getExecuteOnParamFn "getDate"
    "dddd": _.compose (getLanguageLookupFn "days"), (getExecuteOnParamFn "getDay")
    "ddd" : _.compose (getConfiguredSubstrFn 0, 3), (getLanguageLookupFn "days"), (getExecuteOnParamFn "getDay")
    "dd"  : _.compose (getConfiguredSubstrFn 0, 2), (getLanguageLookupFn "days"), (getExecuteOnParamFn "getDay")
    "d"   : getExecuteOnParamFn "getDay"
    "HH"  : _.compose padNumber, (getExecuteOnParamFn "getHours")
    "H"   : getExecuteOnParamFn "getHours"
    "mm"  : _.compose padNumber, (getExecuteOnParamFn "getMinutes")
    "m"   : getExecuteOnParamFn "getMinutes"
    "SS"  : _.compose padNumber, (getExecuteOnParamFn "getSeconds")
    "ss"  : _.compose padNumber, (getExecuteOnParamFn "getSeconds")
    "S"   : getExecuteOnParamFn "getSeconds"
    "s"   : getExecuteOnParamFn "getSeconds"

  formatFunctionsRegex = new RegExp ((_.keys formatFunctions).join "|")

  formatStrToArray = (formatStr) ->
    if formatFunctionsRegex.test formatStr
      group = (formatStr.match formatFunctionsRegex)[0]
      groupId = formatStr.indexOf group
      preGroup = (formatStr.substr 0, groupId) if groupId != 0
      newFormatStr = formatStr.substr (groupId + group.length)
      (if preGroup? then [preGroup, group] else [group]).concat (formatStrToArray newFormatStr)

    else
      [formatStr]

  format = (date, formatStr) ->
    ((if formatFunctions[g]? then formatFunctions[g](date) else g) for g in formatStrToArray formatStr).join ""

  isToday = (date) ->
    (format date, "YYYYMD") == (format new Date(), "YYYYMD")

  millisecondFactors =
    "millisecond": 1
    "second"     : 1e3
    "minute"     : 6e4
    "hour"       : 36e5
    "day"        : 864e5
    "week"       : 6048e5
    "month"      : 2592e6
    "year"       : 31536e6

  add = (date, val, unit) ->
    # std unit is seconds
    new Date(date.getTime() + (val * (unit && millisecondFactors[unit.toLowerCase()] || 1e3)))

  substract = (date, val, unit) -> add date, -val, unit

  return {
    parse: parse
    format: format
    add: add
    substract: substract
    isToday: isToday
  }
