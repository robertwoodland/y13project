import getUnixTime from './getUnixTime';

export default function getDuration(startTime, setDuration, endTime) {

    let unixStart = getUnixTime(startTime)
    let unixEnd = 0

    if (!endTime) {
        unixEnd = Date.now()
    } else {
        unixEnd = new Date(endTime)
    } // NOT TESTED THIS


    let difference = (parseInt(unixEnd) - parseInt(unixStart)) // in milliseconds

    let durationSeconds = Math.floor(difference / 1000)

    let durationMinutes = Math.floor(durationSeconds / 60)
    let leftOverSeconds = durationSeconds % 60

    let durationHours = Math.floor(durationMinutes / 60)
    let leftOverMinutes = durationMinutes % 60

    setDuration(durationHours + " hours, " + leftOverMinutes + " minutes and " + leftOverSeconds + " seconds")
}