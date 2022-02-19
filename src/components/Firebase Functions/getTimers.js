import { useEffect } from "react";
import app from "../base";

export default function getTimers(setRecentTimers, setMaxPageNum, uid){
    useEffect(() => {
        const unsubscribe = app.firestore().collection("timers").where("uid", "==", uid).where("active", "==", false)
        .onSnapshot(querySnapshot => {
            const docIDs = querySnapshot.docs.map(doc => doc.id)
            const timersList = querySnapshot.docs.map(doc => doc.data().name)
            const projectNames = querySnapshot.docs.map(doc => doc.data().projectName)
            const startTimes = querySnapshot.docs.map(doc => doc.data().startTime)
            const endTimes = querySnapshot.docs.map(doc => doc.data().endTime)
            const projectIds = querySnapshot.docs.map(doc => doc.data().projectId)

            let timers = timersList.map((timerName, index) => {
                return [timerName, projectNames[index], docIDs[index], projectIds[index], startTimes[index], endTimes[index]]
            })

            timers.sort((a, b) => {
                return (a[5] - b[5])
            })

            setRecentTimers(timers)
            setMaxPageNum(Math.floor(timers.length/10) + 1)
        })
        // 0 is timer name, 1 is project, 2 is id, 3 is projectID, 4 is start time, 5 is end time
    
      return () => unsubscribe()
    }, []);
}