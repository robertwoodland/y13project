import getUnixTime from './getUnixTime';

export default function getDuration(startTime, endTime, setDuration) {

    let unixStart = getUnixTime(startTime)
    let unixEnd = 0

    if (!endTime) {
        unixEnd = Date.now()
    } else {
        unixEnd = getUnixTime(endTime)
    }


    let difference = (parseInt(unixEnd) - parseInt(unixStart)) // in milliseconds

    let durationSeconds = Math.floor(difference / 1000)

    let durationMinutes = Math.floor(durationSeconds / 60)
    let leftOverSeconds = durationSeconds % 60

    let durationHours = Math.floor(durationMinutes / 60)
    let leftOverMinutes = durationMinutes % 60

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