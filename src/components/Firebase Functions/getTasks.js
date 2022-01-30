import { useEffect } from "react";
import app from "../base";


export default function getTasks(setRecentTasks, setMaxPageNum){
    useEffect(() => {
        const unsubscribe = app.firestore().collection("tasks").orderBy("dueDate")
        .onSnapshot(querySnapshot => {
            const docIDs = querySnapshot.docs.map(doc => doc.id)
            const tasksList = querySnapshot.docs.map(doc => doc.data().name)
            const projectNames = querySnapshot.docs.map(doc => doc.data().projectName)
            const dueDates = querySnapshot.docs.map(doc => doc.data().dueDate)

            const tasks = tasksList.map((taskName, index) => {
                return [taskName, projectNames[index], dueDates[index], docIDs[index]]
            })

            setRecentTasks(tasks)
            setMaxPageNum(Math.floor(tasks.length/10) + 1)
        })
        // 0 is name, 1 is project name, 2 is due date, 3 is ID
    
      return () => unsubscribe()
    }, []);
}