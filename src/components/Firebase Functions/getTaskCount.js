import { useEffect } from 'react';
import app from '../base';


export default function getTaskCount(uid, setTaskCount) {
    useEffect(() => {
        const unsubscribe = app.firestore().collection('users').doc(uid)
        .onSnapshot(querySnapshot => {
            setTaskCount(querySnapshot.data().taskCount)   
        })
        
        return () => unsubscribe()
    }, [])
}