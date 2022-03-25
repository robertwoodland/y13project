import getUnixTime from './getUnixTime';
import { useState } from 'react';

export default function getDuration(startTime, endTime, setDuration) {

    let unixStart = getUnixTime(startTime)
    let unixEnd = 0
    let special = false


    if (!endTime) {
        unixEnd = Date.now()
    } else {
        unixEnd = getUnixTime(endTime)
    }


    let difference = (parseInt(unixEnd) - parseInt(unixStart)) // in milliseconds

    if (difference < 0) {
        special = true
    }

    let durationSeconds = Math.floor(difference / 1000)

    let durationMinutes = Math.floor(durationSeconds / 60)
    let leftOverSeconds = durationSeconds % 60

    let durationHours = Math.floor(durationMinutes / 60)
    let leftOverMinutes = durationMinutes % 60

    if (special) {
        durationHours = 24 + durationHours
        leftOverMinutes = 60 + leftOverMinutes
    }

    if (durationHours.toString().length == 1) {
        durationHours = "0" + durationHours
    }
    if (leftOverMinutes.toString().length == 1) {
        leftOverMinutes = "0" + leftOverMinutes
    }
    if (leftOverSeconds.toString().length == 1) {
        leftOverSeconds = "0" + leftOverSeconds
    }



    let duration = ""
    if (durationHours != "00") {
        duration = durationHours + ":" + leftOverMinutes
    } else {
        duration = leftOverMinutes
    }

    if (setDuration) {
        setDuration(durationHours + " hours, " + leftOverMinutes + " minutes and " + leftOverSeconds + " seconds")
    } else {
        return duration
    }
}