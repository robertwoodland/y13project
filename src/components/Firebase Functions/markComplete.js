import app from "../base";

export default function markComplete(selectedTask, setSelectedProject, setSelectedTask, setDueDate, taskCount, setTaskCount, uid){
    // 0 is name, 1 is project name, 2 is due date, 3 is task ID, 4 is project ID
    if (selectedTask) {
        const taskName = selectedTask[0]
        const taskId = selectedTask[3]
        app.firestore().collection("tasks").doc(taskId).delete()
        .then(() => {
            setSelectedProject()
            setDueDate()
            setSelectedTask()
        })
        setTaskCount((prevState) => prevState += 1)
        console.log(taskCount)
    }

}