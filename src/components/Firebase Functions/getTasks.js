import { useEffect } from "react";
import app from "../base";

export default function getTasks(setRecentTasks, setMaxPageNum, uid){
    useEffect(() => {
        const unsubscribe = app.firestore().collection("tasks").where("uid", "==", uid)
        .onSnapshot(querySnapshot => {
            const docIDs = querySnapshot.docs.map(doc => doc.id)
            const tasksList = querySnapshot.docs.map(doc => doc.data().name)
            const projectNames = querySnapshot.docs.map(doc => doc.data().projectName)
            const dueDates = querySnapshot.docs.map(doc => doc.data().dueDate)
            const projectIds = querySnapshot.docs.map(doc => doc.data().projectId)

            let formattedDates = []
            dueDates.map((date) => {
                let split = date.split("-")
                formattedDates.push(split[0]+split[1]+split[2])
            })

            let tasks = tasksList.map((taskName, index) => {
                return [taskName, projectNames[index], dueDates[index], docIDs[index], projectIds[index], formattedDates[index]]
            })

            tasks.sort((a, b) => {
                return (a[5] - b[5])
            })

            setRecentTasks(tasks)
            setMaxPageNum(Math.floor(tasks.length/10) + 1)
        })
        // 0 is name, 1 is project name, 2 is due date, 3 is task ID, 4 is project ID, (5 is formatted date)
    
      return () => unsubscribe()
    }, []);
}