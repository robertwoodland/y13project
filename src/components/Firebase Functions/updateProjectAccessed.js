import app from '../base'

export default function getProjects(projectId){
    const accessedTime = Date.now();
    app.firestore().collection("projects").doc(projectId).update({
        accessedTime: accessedTime
    })
}