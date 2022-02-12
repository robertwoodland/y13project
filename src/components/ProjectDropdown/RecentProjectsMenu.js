import { Fragment } from "react";
import RecentProject from "./RecentProject";
import { Form } from "react-bootstrap";

// Gets the list of recent projects
export default function RecentProjectsMenu(props){
    const {recentProjects} = props
    const {setSelectedProject} = props
    
    let recentProjectNames = []
    if (recentProjects) {
        recentProjectNames = recentProjects.map(project => project[0])
    }

    let len = 0
    if (recentProjectNames) {
        len = recentProjectNames.length
    }

    if (len > 0){
        const recentNames = recentProjectNames.slice(0, 5).map((projectName, index) =>
        <RecentProject key={index} text={projectName} setSelectedProject={setSelectedProject}/>
        );
        return(<Fragment>{recentNames}</Fragment>)

    } else {
        return(<Form.Label className="ml-3 mt-2 disabled">No recent projects.</Form.Label>)
    }

}