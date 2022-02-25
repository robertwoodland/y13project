import app from "../base";

export default function deleteProject(projectId, setSelectedProject, setProjectId){
    if (projectId) {

        app.firestore().collection("tasks").where("projectId", "==", projectId)
        .get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.id)
            })
        })


        /*
        app.firestore().collection("projects").doc(projectId).delete()
        .then(() => {
            setSelectedProject()
            setProjectId()
        })
        */
    }
}