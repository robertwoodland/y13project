import app from "../base";



export default function handleTaskSubmit(updateProjectAccessed, taskInput, selectedProject, dateInput, projectId){
    if (taskInput && selectedProject && dateInput){
        updateProjectAccessed()
        const creationTime = Date.now()
        if (projectId) {
            app.firestore().collection("tasks").add({
                name: taskInput,
                projectName: selectedProject,
                projectId: projectId,
                creationTime: creationTime,
                modifiedTime: creationTime,
                dueDate: dateInput
            })
        }
    }
}