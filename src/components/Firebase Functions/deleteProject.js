import app from "../base";

export default function deleteProject(projectId, setProjectId){
    if (projectId) {
        // Removes tasks related to the project
        app.firestore().collection("tasks").where("projectId", "==", projectId)
        .get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                app.firestore().collection("tasks").doc(doc.id).delete()
            })
        })
        // Removes timers related to the project
        app.firestore().collection("timers").where("projectId", "==", projectId)
        .get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                app.firestore().collection("timers").doc(doc.id).delete()
            })
        })

        // Removes the project itself
        app.firestore().collection("projects").doc(projectId).delete()
        .then(() => {
            setProjectId()
        })
    }
}