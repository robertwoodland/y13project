import app from "../base";
import getUnixTime from "../TimerPage/getUnixTime";

export default function updateActiveTimer(timerName, selectedProject, projectId, startTime, uid) {
    if (projectId) {
        app.firestore().collection("timers").where("uid", "==", uid).where("active", "==", true).get()
        .then((querySnapshot) => {
            if (querySnapshot.docs.length == 1) {
                app.firestore().collection("timers").doc(querySnapshot.docs[0].id).update({
                    name: timerName,
                    projectId: projectId,
                    projectName: selectedProject,
                    startTime: getUnixTime(startTime)
                })
            }
        })
    }
}