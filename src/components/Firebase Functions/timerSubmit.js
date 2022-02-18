import app from "../base";
import getUnixTime from "../TimerPage/getUnixTime";
import updateProjectAccessed from "./updateProjectAccessed";

export default async function timerSubmit(setTimerActive, timerName, selectedProject, projectId, startTime, endTime, setTimerId, uid){
    if (timerName && selectedProject && startTime && endTime){
        startTime = getUnixTime(startTime)

        if (endTime) {
            endTime = getUnixTime(endTime)
        }
        
        await app.firestore().collection("timers").add({
            name: timerName,
            projectName: selectedProject,
            projectId: projectId,
            startTime: startTime,
            endTime: endTime,
            active: false,
            uid: uid
        })
        .then((docRef) => {
            setTimerActive(true)
            updateProjectAccessed(projectId)

            setTimerId(docRef.id)

        })
    } else if (timerName && selectedProject && startTime) {
        startTime = getUnixTime(startTime)
        endTime = getUnixTime(endTime)

        await app.firestore().collection("timers").add({
            name: timerName,
            projectName: selectedProject,
            projectId: projectId,
            startTime: startTime,
            active: true,
            uid: uid
        })
        .then((docRef) => {
            setTimerActive(true)
            updateProjectAccessed(projectId)

            setTimerId(docRef.id)

        })
    }
}