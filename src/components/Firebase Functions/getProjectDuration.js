import { useEffect, useContext } from 'react';
import app from '../base';
import { UserContext } from '../../App';
import getDuration from '../TimerPage/getDuration';
import getHHMM from '../TimerPage/getHHMM';

export default async function getProjectDuration(projectNames, projectIds, values, setValues, labels, setLabels) {

    let vals = []

    for (let index = 0; index < projectNames.length; index++) {
        const projectName = projectNames[index];
        const projectId = projectIds[index]
        let projectDuration = 0
        
        const querySnapshot = await app.firestore().collection("timers").where("projectId", "==", projectId).get()

            querySnapshot.forEach((timer) => {
                const data = timer.data()
                if (data.endTime) {
                    const start = getHHMM(data.startTime)
                    const end = getHHMM(data.endTime)

                    let duration = getDuration(start, end)

                    // If it is over 59 minutes
                    if (duration.toString().indexOf(":") == 2) {
                        const parts = duration.toString().split(":")
                        duration = parseInt(parts[0] * 60) + parseInt(parts[1])
                    } 

                    // If it starts with an 0
                    if (duration.toString().indexOf("0") == 0) {
                        duration = duration.slice(1)
                    }
                    
                    projectDuration = parseInt(projectDuration) + parseInt(duration)
                }
        })  
        vals.push([projectDuration, projectName])      
    }

    const durations = vals.map((val) => val[0])
    const labs = vals.map((val) => val[1])

    setValues(durations)
    setLabels(labs)

}

