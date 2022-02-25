import app from "../base";

export default function deleteProject(projectId, setSelectedProject, setProjectId){
    if (projectId) {

        app.firestore().collection("tasks").where("projectId", "==", projectId)
        .get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                app.firestore().collection("tasks").doc(doc.id).delete()
            })
        })

        app.firestore().collection("timers").where("projectId", "==", projectId)
        .get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                app.firestore().collection("timers").doc(doc.id).delete()
            })
        })


        app.firestore().collection("projects").doc(projectId).delete()
        .then(() => {
            setSelectedProject()
            setProjectId()
        })
    }
}