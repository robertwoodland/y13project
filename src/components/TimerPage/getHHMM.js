export default function getHHMM(time) {
    let currentHours = new Date(time).getHours()
    let currentMins = new Date(time).getMinutes()

    if (currentHours.toString().length == 1) {
        currentHours = "0" + currentHours
    }

    if (currentMins.toString().length == 1) {
        currentMins = "0" + currentMins
    }

    return currentHours + ":" + currentMins
}