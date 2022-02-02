import { useEffect } from "react";
import app from "../base";

export default function taskSubmit(updateProjectAccessed, setTaskSubmitted, taskInputName, selectedProject, dateInput, projectId, update, selectedTask){
    let taskId = ""
    if (selectedTask) {
        taskId = selectedTask[3]
    }
    
    if (taskInputName && selectedProject && dateInput){
        updateProjectAccessed(projectId)
        const currentTime = Date.now()
        if (projectId && !update) {
            app.firestore().collection("tasks").add({
                name: taskInputName,
                projectName: selectedProject,
                projectId: projectId,
                creationTime: currentTime,
                modifiedTime: currentTime,
                dueDate: dateInput
            })
            setTaskSubmitted(true)
        } else if (projectId && update && taskId) {
            app.firestore().collection("tasks").doc(taskId).update({
                name: taskInputName,
                projectName: selectedProject,
                projectId: projectId,
                modifiedTime: currentTime,
                dueDate: dateInput
            })
            setTaskSubmitted(true)
        }
    }
}