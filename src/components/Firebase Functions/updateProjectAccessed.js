import app from '../base';

export default function updateProjectAccessed(projectId){
    const accessedTime = Date.now();
    app.firestore().collection("projects").doc(projectId).update({
        accessedTime: accessedTime
    })
}