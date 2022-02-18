export default function getHHMM(time) {
    const currentHours = new Date(time).getHours()
    const currentMins = new Date(time).getMinutes()

    return currentHours + ":" + currentMins
}