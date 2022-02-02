import app from "../base"

export default function handleProjectSubmit(uid, projectInput, recentProjects, setSelectedProject){
    const recentProjectNames = recentProjects.map(item => item[0])
    if (projectInput && !recentProjectNames.includes(projectInput)){
        const creationTime = Date.now()
        setSelectedProject(projectInput)
        app.firestore().collection("projects").add({
            name: projectInput,
            creationTime: creationTime,
            accessedTime: creationTime,
            userId: uid
        })
    } else {
        setSelectedProject(projectInput)
    }
}