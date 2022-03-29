import React, { Fragment, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import ContainerPage from '../components/styled/ContainerPage';
import getProjects from '../components/Firebase Functions/getProjects';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import getProjectDuration from '../components/Firebase Functions/getProjectDuration';

ChartJS.register(ArcElement, Tooltip, Legend);




export default function ReportsPage() {
    // Sample data as a basis for the chart
    let data = {
        labels: [],
        datasets: [
        {
            label: '# of Votes',
            data: [],
            backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1.3,
        },
        ],
    }


    const [data1, setData1] = useState({});
    const [values, setValues] = useState([]);
    const [labels, setLabels] = useState([]);
    const [redraw, setRedraw] = useState(false);

    // Initialise data1 from sample data
    useEffect(() => {
        let dataCopy = data
        setData1(dataCopy)
    }, [])
    

    // Get projects
    const [recentProjects, setRecentProjects] = useState([]);
    getProjects(setRecentProjects)

    // Gets duration for each project
    useEffect(async () => {
        if (recentProjects.length) {
            const projectNames = recentProjects.map((project) => project[0])
            const projectIds = recentProjects.map((project) => project[2])

            getProjectDuration(projectNames, projectIds, setValues, setLabels)
        }
    }, [recentProjects])

    // Upates the chart whenever the values change
    useEffect(() => {
        setData1((prev) => {
            let old = prev

            if (labels != 0) {
                old.labels = labels
            } else {
                old.labels = []
            }

            if (values != 0) {
                old.datasets[0].data = values
            } else {
                old.datasets[0].data = []
            }

            return old
        })
        setRedraw(true)
    }, [values, labels])
    
    useEffect(() => {
        setRedraw(false)
    }, [redraw])

    // Shown if there is an error with the user's browser
    function FallbackComponent() {
        return(
            <Fragment>
                <h5>Graph couldn't be drawn 😞</h5>
            </Fragment>
        )
    }


    return(
        <ContainerPage>
            <Form>
                <Form.Label>6 most recent projects:</Form.Label>
            </Form>


            {data1.datasets ? (data1.datasets[0].data.length ? <Doughnut data={data1} options={{responsive:true, maintainAspectRatio:false,}} 
            fallbackContent={<FallbackComponent/>} redraw={redraw} /> : <FallbackComponent/>)
            
            : <FallbackComponent/>}

            {!data1.datasets? (!recentProjects.length ? <h6>No projects</h6> : <h6>No timers</h6>)
            
            : <Fragment/>}


        </ContainerPage>
    )
}