import app from '../base';

export default function updateTaskCount(){
    const {uid, taskCount} = useContext(UserContext)
    app.firestore().collection('users').doc(uid).update({
        taskCount: taskCount
    })
}