export default function getHHMM(time) {
    let intTime = parseInt(time)
    let currentHours = new Date(intTime).getHours()
    let currentMins = new Date(intTime).getMinutes()

    if (currentHours.toString().length == 1) {
        currentHours = "0" + currentHours
    }

    if (currentMins.toString().length == 1) {
        currentMins = "0" + currentMins
    }

    return currentHours + ":" + currentMins
}