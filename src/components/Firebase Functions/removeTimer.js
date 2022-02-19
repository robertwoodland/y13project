import app from "../base";

export default function removeTimer(selectedTimer, setSelectedProject, setSelectedTimer){
    // 0 is timer name, 1 is project, 2 is id, 3 is projectID, 4 is start, 5 is end
    if (selectedTimer) {
        const timerId = selectedTimer[2]
        app.firestore().collection("timers").doc(timerId).delete()
        .then(() => {
            setSelectedProject()
            setSelectedTimer()
        })
    }
}