import app from "../base";

export default async function taskSubmit(updateProjectAccessed, setTaskSubmitted,
    taskInputName, selectedProject, dateInput, projectId, update, selectedTask, uid){

    let taskId = ""
    if (selectedTask) {
        taskId = selectedTask[3]
    } else {
        taskId = false
    }

    const currentTime = Date.now()
    const inputTime = new Date(dateInput).getTime()
    const difference = currentTime - inputTime

    // If the input date is before the current date, set to current
    if (difference > 0) {
        const currentDate = new Date(Date.now())
        const currentYear = currentDate.getFullYear()
        let currentMonth = currentDate.getMonth() + 1
    
        if (currentMonth.toString().length == 1) {
            currentMonth = "0" + currentMonth
        }
    
        let currentDay = currentDate.getDate()
    
        if (currentDay.toString().length == 1) {
            currentDay = "0" + currentDay
        }

        dateInput = currentYear + "-" + currentMonth + "-" + currentDay
    }


    if (taskInputName && selectedProject && dateInput){
        if (projectId) {
            updateProjectAccessed(projectId)
        }
        const currentTime = Date.now()
        if (projectId && !update) {
            await app.firestore().collection("tasks").add({
                name: taskInputName,
                projectName: selectedProject,
                projectId: projectId,
                creationTime: currentTime,
                modifiedTime: currentTime,
                dueDate: dateInput,
                uid: uid
            })
            setTaskSubmitted(true)
        } else if (projectId && update && taskId) {
            await app.firestore().collection("tasks").doc(taskId).update({
                name: taskInputName,
                projectName: selectedProject,
                projectId: projectId,
                modifiedTime: currentTime,
                dueDate: dateInput,
                uid: uid
            })
            setTaskSubmitted(true)
        }
    }
}