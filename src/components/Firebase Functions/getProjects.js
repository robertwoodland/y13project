import { useEffect, useContext } from 'react'
import app from '../base'
import { UserContext } from '../../App';

export default function getProjects(setRecentProjects){
    const {uid} = useContext(UserContext)
    console.log(uid)
    // Get projects
    useEffect(() => {
        const unsubscribe = app.firestore().collection("projects")
        .where("userId", "==", uid).onSnapshot(querySnapshot => {
            const projectIds = querySnapshot.docs.map(doc => doc.id)
            const projectNames = querySnapshot.docs.map(doc => doc.data().name)
            const accessedTimes = querySnapshot.docs.map(doc => doc.data().accessedTime)

            const projects = projectNames.map((projectName, index) => {
                return [projectName, accessedTimes[index], projectIds[index]]
            })

            let sortedProjects = projects.sort(function(a,b) {
                return b[1] - a[1]
            })
            
            setRecentProjects(sortedProjects)
        })  
        // 0 is project name, 1 is accessed time, 2 is ID

        return () => unsubscribe()
    }, []);
    
}