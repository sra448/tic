window.tic = do ->

  # tic has some languages
  langs =
    "en-US":
      stdDateFormat: "MM/DD/YYYY",
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
  # rest = (xs) -> xs.slice 1 if xs?
  # last = (xs) -> xs[xs.length-1] if xs?

  keys = (obj) -> (k for k, v of obj)

  compact = (xs) -> (x for x in xs when x?)

  substr = (str, id, i) -> ("" + str).substr id, i

  getConfiguredSubstrFn = (id, i) -> (str) -> substr str, id, i

  increment = (num) -> num + 1

  padNumber = (num, targetLength = 2) ->
    if (num+"").length < targetLength then padNumber "0#{num}", targetLength else num+""

  getAttribute = (obj, attribute) -> obj[attribute]

  getLanguageLookupFn = (key) -> curry getAttribute, lang[key]

  dotExec = (p) -> (obj) -> obj[p]()

  # more tic specific stuff

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

  equals = (a, b) -> !(a < b || a > b)

  isBeforeMarch1 = (d) -> d.getMonth() < 4 if d.getMonth?

  isLeapYear = (d) ->
    y = if d.getFullYear? then d.getFullYear() else +d
    y % 400 == 0 || (y % 4 == 0 && y % 100 != 0)

  leapDaysBetween = (date1, date2) ->
    [d1, d2] = if date1 > date2 then [date2, date1] else [date1, date2]
    y1 = if d1.getFullYear? then d1.getFullYear() else +d1
    y2 = if d2.getFullYear? then d2.getFullYear() else +d2
    y1 = y1 + 1 unless isBeforeMarch1 d1
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
    "milliseconds": 1
    "seconds"     : 1e3
    "minutes"     : 6e4
    "hours"       : 36e5
    "days"        : 864e5
    "weeks"       : 6048e5
    "years"       : 31536e6

  daysInMonths = (start_m, mc) ->
    dms = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    months = if mc > 0 then [start_m..start_m + mc] else [start_m-(mc+1)..start_m-1]
    foldl ((a, b) -> a + b), 0, (dms[dc % 11] for dc in months)

  add = (date, amount, unit = "second") ->
    switch unit
      when "year", "years"
        d2 = new Date (date.getTime() + amount*msFactors.years)
        addLeapDaysR date, d2, (amount / (Math.abs amount))

      when "month", "months"
        m1 = if date.getMonth? then date.getMonth() else +date
        d = new Date (date.getTime() + (daysInMonths m1, amount) * msFactors.days)
        leapDaysFactor = (amount / (Math.abs amount))

        addLeapDaysR date, d, leapDaysFactor

      else
        factor = msFactors[unit] || msFactors[unit+"s"] || 1e3
        new Date date.getTime() + (amount * factor)

  remove = (date, amount, unit) -> add date, -amount, unit

  return {
    equals: equals,
    resetTime: resetTime
    parse: parse
    format: format
    add: add
    remove: remove
    isToday: isToday
    isLeapYear: isLeapYear
  }
