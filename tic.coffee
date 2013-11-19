window.tic = do ->

  # tic has some languages
  langs =
    "en-US":
      stdDateFormat: "MM/DD/YYYY"
      days         : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
      months       : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      monthsShort  : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  # change this, if your default language is something else
  lang = langs["en-US"]

  # internal functions

  apply = (f, args) -> f.apply window, args

  curry = (f, args...) ->
    (moreArgs...) -> f.apply this, (args.concat moreArgs)

  compose = (fs...) ->
    (args...) ->
      args = [apply fs[i], args] for i in [fs.length-1..0]
      first args

  foldl = (f, a, [x, xs...]) ->
    if xs.length == 0 then f a, x else foldl f, (f a, x), xs

  first = (xs) -> xs[0] if xs? && xs.length > 0

  take = (xs, t) -> xs.slice t

  drop = (xs, t) -> xs.splice t

  repeat = (xs, t) ->
    l = xs.length - 1
    (xs[i % l] for i in [0..t-1])

  keys = (obj) -> (k for k, v of obj)

  compact = (xs) -> (x for x in xs when x?)

  substr = (str, id, i) -> ("" + str).substr id, i

  getConfiguredSubstrFn = (id, i) -> (str) -> substr str, id, i

  increment = (num) -> num + 1

  padNumber = (num, targetLength = 2) ->
    if (num+"").length < targetLength then padNumber "0#{num}", targetLength else num+""

  dot = (obj, attribute) -> obj[attribute]

  dotExec = (p) -> (obj) -> obj[p]()

  # more tic specific stuff

  getLanguageLookupFn = (key) -> curry dot, lang[key]

  clone = (d) -> new Date d

  resetTime = (date, time = "") ->
    [h, m, s, ms] = time.split ":"
    d = clone date
    d.setHours (h || 0)
    d.setMinutes (m || 0)
    d.setSeconds (s || 0)
    d.setMilliseconds (ms || 0)
    d

  parseFunctions =
    "YYYY": (date, val) -> new Date (date.setYear val)
    "YY"  : (date, val) -> new Date (date.setYear "20"+val)
    "MM"  : (date, val) -> new Date (date.setMonth +val-1)
    "M"   : (date, val) -> new Date (date.setMonth +val-1)
    "DD"  : (date, val) -> new Date (date.setDate val)
    "D"   : (date, val) -> new Date (date.setDate val)
    "HH"  : (date, val) -> new Date (date.setHours val)
    "H"   : (date, val) -> new Date (date.setHours val)
    "mm"  : (date, val) -> new Date (date.setMinutes val)
    "m"   : (date, val) -> new Date (date.setMinutes val)
    "SS"  : (date, val) -> new Date (date.setSeconds val)
    "S"   : (date, val) -> new Date (date.setSeconds val)
    "ss"  : (date, val) -> new Date (date.setSeconds val)
    "s"   : (date, val) -> new Date (date.setSeconds val)

  parseFormatRegex = new RegExp ((keys parseFunctions).join "|"), "g"

  parse = (str = "", formatStr = lang.stdDateFormat)  ->
    if str == ""
      new Date()
    else
      switch typeof str
        when "string"
          date = resetTime new Date()
          parseRules = formatStr.match parseFormatRegex
          applyRule = (date, rule) ->
            val = str.substr (formatStr.indexOf rule), rule.length
            if parseFunctions[rule]? then parseFunctions[rule] date, val else date

          if parseRules?
            foldl applyRule, date, parseRules
          else
            date

        when "number" then new Date str
        else new Date()

  formatFunctions =
    "YYYY": dotExec "getFullYear"
    "YY"  : compose (getConfiguredSubstrFn 2), (dotExec "getFullYear")
    "MMMM": compose (getLanguageLookupFn "months"), (dotExec "getMonth")
    "MMM" : compose (getLanguageLookupFn "monthsShort"), (dotExec "getMonth")
    "MM"  : compose padNumber, increment, (dotExec "getMonth")
    "M"   : compose increment, (dotExec "getMonth")
    "DD"  : compose padNumber, (dotExec "getDate")
    "D"   : dotExec "getDate"
    "dddd": compose (getLanguageLookupFn "days"), (dotExec "getDay")
    "ddd" : compose (getConfiguredSubstrFn 0, 3), (getLanguageLookupFn "days"), (dotExec "getDay")
    "dd"  : compose (getConfiguredSubstrFn 0, 2), (getLanguageLookupFn "days"), (dotExec "getDay")
    "d"   : dotExec "getDay"
    "HH"  : compose padNumber, (dotExec "getHours")
    "H"   : dotExec "getHours"
    "mm"  : compose padNumber, (dotExec "getMinutes")
    "m"   : dotExec "getMinutes"
    "SS"  : compose padNumber, (dotExec "getSeconds")
    "ss"  : compose padNumber, (dotExec "getSeconds")
    "S"   : dotExec "getSeconds"
    "s"   : dotExec "getSeconds"

  formatFunctionsRegex = new RegExp ((keys formatFunctions).join "|")

  formatStrGroups = (formatStr) ->
    if formatFunctionsRegex.test formatStr
      group = (formatStr.match formatFunctionsRegex)[0]
      groupId = formatStr.indexOf group
      preGroup = (formatStr.substr 0, groupId) if groupId != 0
      newFormatStr = formatStr.substr (groupId + group.length)
      (if preGroup? then [preGroup, group] else [group]).concat (formatStrGroups newFormatStr)
    else
      [formatStr]

  format = (date, formatStr = lang.stdDateFormat)  ->
    (for g in formatStrGroups formatStr
      (if formatFunctions[g]? then formatFunctions[g] date else g)
    ).join ""

  isToday = (date) ->
    (format date, "YYYYMD") == (format new Date(), "YYYYMD")

  equals = (a, b, precision) ->
    if !precision?
      !(a < b || a > b)
    else
      switch precision
        when "y", "year", "years" then equals a, b, "YYYY"
        when "m", "month", "months" then equals a, b, "YYYYMM"
        # when "w", "week", "weeks" then addWeeks date, +amount
        when "d", "day", "days" then equals a, b, "YYYYMMDD"
        when "h", "hour", "hours" then equals a, b, "YYYYMMDDHH"
        when "min", "minute", "minutes" then equals a, b, "YYYYMMDDHHmm"
        when "s", "second", "seconds" then equals a, b, "YYYYMMDDHHmmSS"
        else (format a, precision) == (format b, precision)

  stdTimezoneOffset = (date) ->
    jan = new Date date.getFullYear(), 0, 1
    jul = new Date date.getFullYear(), 6, 1
    Math.max jan.getTimezoneOffset(), jul.getTimezoneOffset()

  isDST = (date) -> date.getTimezoneOffset() < (stdTimezoneOffset date)

  isBeforeMarch1 = (d) -> d.getMonth() < 2 if d.getMonth?

  isLeapYear = (d) ->
    y = if d.getFullYear? then d.getFullYear() else +d
    y % 400 == 0 || (y % 4 == 0 && y % 100 != 0)

  leapDaysBetween = (date1, date2) ->
    [d1, d2] = if date1 > date2 then [date2, date1] else [date1, date2]
    y1 = if d1.getFullYear? then d1.getFullYear() else +d1
    y2 = if d2.getFullYear? then d2.getFullYear() else +d2
    y1 = y1 + 1 if !(isBeforeMarch1 d1)
    y2 = y2 - 1 if isBeforeMarch1 d2

    if y2 > y1
      foldl ((a, b) -> a + b), 0, ((if isLeapYear y then 1 else 0) for y in [y1..y2])
    else if y2 == y1
      if isLeapYear y2 then 1 else 0
    else
      0

  addLeapDaysR = (d1, d2, dir = 1) ->
    a = new Date (if dir > 0 then Math.max d1, d2 else Math.min d1, d2)
    ld = (leapDaysBetween d1, d2) * dir
    if ld == 0 then a else addLeapDaysR a, (add a, ld, "days"), dir

  msFactors =
    "millisecond": 1
    "second"     : 1e3
    "minute"     : 6e4
    "hour"       : 36e5
    "day"        : 864e5
    "week"       : 6048e5
    "year"       : 31536e6

  addYears = (date, amount) ->
    d = addMilliseconds date, amount*msFactors.year
    d = addLeapDaysR date, d, (amount / (Math.abs amount))
    resetTime d, (format date, "HH:mm:SS")

  daysForMonths = (m, mc) ->
    days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if mc < 0
      days = days.reverse()
      m = [0..11].reverse()[m] - 1
    drop (repeat days, (Math.abs mc) + m), m

  addMonths = (date, amount) ->
    factor = (amount / (Math.abs amount))
    days = foldl ((a, b) -> a + b), 0, (daysForMonths date.getMonth(), amount)
    d = addLeapDaysR date, (addDays date, days*factor), factor
    resetTime d, (format date, "HH:mm:SS")

  addWeeks = (date, amount) ->
    d = addMilliseconds date, amount*msFactors.week
    resetTime d, (format date, "HH:mm:SS")

  addDays = (date, amount) ->
    d = addMilliseconds date, amount*msFactors.day
    resetTime d, (format date, "HH:mm:SS")

  addHours = (date, amount) -> addMilliseconds date, amount*msFactors.hour

  addMinutes = (date, amount) -> addMilliseconds date, amount*msFactors.minute

  addSeconds = (date, amount) -> addMilliseconds date, amount*msFactors.second

  addMilliseconds = (date, amount) -> new Date (date.getTime() + amount)

  add = (date, amount, unit = "second") ->
    switch unit
      when "y", "year", "years" then addYears date, +amount
      when "m", "month", "months" then addMonths date, +amount
      when "w", "week", "weeks" then addWeeks date, +amount
      when "d", "day", "days" then addDays date, +amount
      when "h", "hour", "hours" then addHours date, +amount
      when "min", "minute", "minutes" then addMinutes date, +amount
      when "s", "second", "seconds" then addSeconds date, +amount
      else addMilliseconds date, +amount

  remove = (date, amount, unit) -> add date, -amount, unit

  increment = (date, amount, unit) -> add date, 1, unit

  decrement = (date, amount, unit) -> add date, -1, unit

  return {
    equals: equals,
    resetTime: resetTime
    parse: parse
    format: format
    add: add
    increment: increment
    remove: remove
    decrement: decrement
    isToday: isToday
    isLeapYear: isLeapYear
    isDST: isDST
  }
