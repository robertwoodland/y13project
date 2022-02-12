import app from "../base";

export default function markComplete(selectedTask, setSelectedProject, setSelectedTask, setDueDate, taskCount, uid){
    // 0 is name, 1 is project name, 2 is due date, 3 is task ID, 4 is project ID
    if (selectedTask) {
        const taskId = selectedTask[3]
        app.firestore().collection("tasks").doc(taskId).delete()
        .then(() => {
            setSelectedProject()
            setDueDate()
            setSelectedTask()

            app.firestore().collection('users').doc(uid).update({
                taskCount: taskCount + 1
            })
        })
    }

}