---
title: Time manipulation in Elm
date: 2017-06-07 14:00:00 +0100
categories: elm
remote_url: "https://www.synbioz.com/blog/time-manipulation-in-elm"
---

This article is a detailed explanation of my talk at Elm Europe about time manipulation in Elm. In
this talk, I presented some reasons to care about what happens to your dates: JavaScript dates are
notoriously bad, date manipulation can quickly become error-prone and a lot of countries have
several timezones (France having the most in the world: 12). Here I will present more examples of
time manipulation with the 3 most used libraries.

First, you need to know what is your need.

- [rluiten/elm-date-extra](http://package.elm-lang.org/packages/rluiten/elm-date-extra/latest) will
  help you if you don't need to manipulate timezones and can be an everything tool.
- [mgold/elm-date-format](http://package.elm-lang.org/packages/mgold/elm-date-format/latest) will be
  useful if you already have dates and just need to display them according to your locale.
- [elm-community/elm-time](http://package.elm-lang.org/packages/elm-community/elm-time/latest) is a
  safe way of manipulating dates without relying on the JS implementation but comes with more data
  and requires a little more work

But first, you need to know how to get today's date in the elm architecture. The main thing to
remember is that `Date.now` (and its counterpart `Time.now`) gives you a Task and must then be part
of your update function. In this example, I start the application with a Command in the init
function that will send a `SetToday` message to the update function.

<iframe src="https://embed.ellie-app.com/3nZ2YRLBdfGa1/0"
  style="width:100%; height:400px; border:0; border-radius: 3px; overflow:hidden;"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

Another common thing to do is to allow the user to fill in a date in a field. This example allows
you to test how `Date.fromString` interprets strings. A lot of strings can be considered as valid
dates: "1" is valid and matches to Mon Jan 01 2001 at midnight for instance.

<iframe src="https://embed.ellie-app.com/3pmmPwSm44sa1/0"
  style="width:100%; height:400px; border:0; border-radius: 3px; overflow:hidden;"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

Let's continue with some examples with `rluiten/elm-date-extra`.
The main thing to know about this library is that it goes really well with the main Date functions.

For instance, if you want to create a date where you know each part (or don't care about some of
them), you just need the `Date.Extra.Create.dateFromFields` function. It takes each part of a date
from year to millisecond and gives you a `Date`.

Now, if you need to create a date and then display it in the american format, this is an example:

<iframe src="https://embed.ellie-app.com/3nVNnVDv8m7a1/0"
  style="width:100%; height:400px; border:0; border-radius: 3px; overflow:hidden;"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

As you can see, you need to provide quite some data.
The package provides you with `Date.Extra.Config` for 13 languages (and 3 versions of English).
Don't hesitate to make a pull request if you can provide data for you language :).

I used the `longDate` format for this example but you can obtain the date,
longDate, time, longTime, dateTime format and the firstDayOfWeek (yes,
it varies from country to country, US and Brazil starts their week on Sundays).
Feel free to test each format in this Ellie code to see what they each mean.
You also could use your own formating with something like that `"%A %d %B %Y %H:%M"` where the `%`
parts will be replaced by the equivalent value (inspired by [this
library](https://github.com/mgold/elm-date-format/blob/1.0.4/src/Date/Format.elm)).

Let's see how to manipulate several dates now.
Here are examples of time comparison and a duration between them:

<iframe src="https://embed.ellie-app.com/3pmxy5zB8sma1/0"
  style="width:100%; height:400px; border:0; border-radius: 3px; overflow:hidden;"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

As you can see, comparison is quite obvious when you compare two dates. Obtaining a diff is
straightforward and returns a record with a detailed duration. Beware though, if you want the total
number of hours of the diff, you will need to do calculations. You also have the `is3` function at
your disposal if you need to compare three dates to see if one date is between the two others, for
instance.

Alright, there is more to this package but, in my opinion, if you need more than that, you might
want to consider `elm-community/elm-time` to avoid surprises with date and time manipulation. You
could want to add a week and find yourself puzzled if there is a Daylight Saving Time between your
two dates: duration could be off by a day because one day is off by an hour (and I say that because
it happened to me).

Before diving in this, let's just take a second to talk about `mgold/elm-date-format`. You might
just need to display dates, and for that, this package could be what you need. It doesn't include
localizations though. You will need to provide that, based on this ["international
format"](https://github.com/mgold/elm-date-format/blob/1.3.0/src/Date/Local.elm#L86). So give it a
try if this might be all you need because it's a really lightweight package.

So, `elm-community/elm-time` takes the problem from another angle: recoding everything about dates
in pure Elm code. Dates are now just a record with a year, a month, a day and so on. That way, you
can manipulate each value separately and have control over the timezone. The display will then use
these informations and give out the right date and time in the end. The catch is that everything
must be recoded and timezone data included. So this package will make your resulting JavaScript
sensibly bigger.

Let's dive right in the timezone mess. Here is an example displaying the date and time based on a
UTC time: February, the 23rd 2017 at 4pm. When displaying it after transforming it to a timestamp,
it is 08:15 in Eucla, Australia (a city with its own pretty timezone).

<iframe src="https://embed.ellie-app.com/3pq4GzDpFh4a1/1"
  style="width:100%; height:400px; border:0; border-radius: 3px; overflow:hidden;"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

A couple thing to notice here: you need to load the timezone explicitly and it is lazy. That's the
reason behind the `()` in `timezone = australia_eucla ()`. In this example, I loaded the timezone
directly but there is a function `Time.TimeZones.fromName : String -> Maybe TimeZone` that allows
you to lookup a timezone with its name. There is also a Dict that contains all of them if you need to
present them to your user. And if you need them, they're all on the [documentation page of
elm-time](http://package.elm-lang.org/packages/elm-community/elm-time/1.0.5/Time-TimeZones).

The main takeaway of this article is that you should be conscious of your choices when dealing with
dates. There are choices, each with their strength and weaknesses. So, just think before sending a
date and displaying. Although, you can also leverage the strength of Elm and refactoring your code
if you need to change way. Either way, have a good time manipulating it ;).

---
The Synbioz Team.<br/>
Free to be together.
