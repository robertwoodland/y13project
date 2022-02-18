import app from "../base";
import updateProjectAccessed from "./updateProjectAccessed";


export default function endTimer(activeTimer){
    const timerId = activeTimer[2]
    const projectId = activeTimer[3]
    const endTime = Date.now()

    app.firestore().collection("timers").doc(timerId).update({
        active: false,
        endTime: endTime
    })

    updateProjectAccessed(projectId)

}