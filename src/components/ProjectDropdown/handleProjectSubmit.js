import app from "../base"

export default function handleProjectSubmit(uid, projectInput, recentProjects, setSelectedProject, setProjectId){
    const recentProjectNames = recentProjects.map(item => item[0])
    if (projectInput && !recentProjectNames.includes(projectInput)){
        const creationTime = Date.now()
        setSelectedProject(projectInput)
        app.firestore().collection("projects").add({
            name: projectInput,
            creationTime: creationTime,
            accessedTime: creationTime,
            userId: uid
        }).then((docRef) => {
            setProjectId(docRef.id)
            console.log(docRef.id)
        }
        )
    } else {
        setSelectedProject(projectInput)
    }
}