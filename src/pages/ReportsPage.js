import React, { Fragment, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import ContainerPage from '../components/styled/ContainerPage';
import getProjects from '../components/Firebase Functions/getProjects';

import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineController } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import getProjectDuration from '../components/Firebase Functions/getProjectDuration';

ChartJS.register(ArcElement, Tooltip, Legend);




export default function ReportsPage() {

    let data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
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

    // Initialise data1
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

    useEffect(() => {
        setData1((prev) => {
            let old = prev
            old.labels = labels
            old.datasets[0].data = values

            return old
        })
    }, [values, labels])
    

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


            {data1.datasets ? <Doughnut data={data1} options={{responsive:true, maintainAspectRatio:false,}} fallbackContent={<FallbackComponent/>} redraw={true} />
            : <FallbackComponent/>}  


        </ContainerPage>
    )
}