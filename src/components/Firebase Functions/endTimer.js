import app from "../base";
import getUnixTime from "../TimerPage/getUnixTime";
import updateProjectAccessed from "./updateProjectAccessed";


export default function endTimer(activeTimer, endTime, setTimerSubmitted){
    const timerId = activeTimer[2]
    const projectId = activeTimer[3]



    let unixEndTime = null
    
    if (!endTime) {
        unixEndTime = Date.now()
    } else {
        unixEndTime = getUnixTime(endTime)
    }

    app.firestore().collection("timers").doc(timerId).update({
        active: false,
        endTime: unixEndTime
    })

    updateProjectAccessed(projectId)

    setTimerSubmitted(true)

}