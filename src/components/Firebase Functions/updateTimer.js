import app from "../base"
import getUnixTime from "../TimerPage/getUnixTime"


export default function updateTimer(selectedTimer, timerName, startTime, endTime, selectedProject, projectId, setEditTimer){
    const timerId = selectedTimer[2]
    const start = getUnixTime(startTime)
    const end = getUnixTime(endTime)

    app.firestore().collection("timers").doc(timerId).update({
        name: timerName,
        projectName: selectedProject,
        projectId: projectId,
        startTime: start,
        endTime: end
    }).then(
        setEditTimer(false)
    )
}