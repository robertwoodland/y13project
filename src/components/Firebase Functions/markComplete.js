import app from "../base";

export default function markComplete(selectedTask, setSelectedProject, setSelectedTask, setDueDate){
    // 0 is name, 1 is project name, 2 is due date, 3 is task ID, 4 is project ID
    const taskName = selectedTask[0]
    const taskId = selectedTask[3]
    app.firestore().collection("tasks").doc(taskId).delete()
    .then(() => {
        setSelectedProject()
        setDueDate()
        setSelectedTask()
    })

}