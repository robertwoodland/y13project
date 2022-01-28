import { Fragment } from "react";
import RecentProject from "./RecentProject";
import { Form } from "react-bootstrap";

// Gets the list of recent projects
export default function RecentProjectsMenu(props){
    const {recentProjectNames} = props
    const {setSelectedProject} = props
    
    let len = 0
    if (recentProjectNames) {
        len = recentProjectNames.length
    }

    if (len > 0){
        const recentNames = recentProjectNames.slice(0, 5).map((projectName) =>
        <RecentProject text={projectName} setSelectedProject={setSelectedProject}/>
        );
        return(<Fragment>{recentNames}</Fragment>)

    } else {
        return(<Form.Label className="ml-3 mt-2 disabled">No recent projects.</Form.Label>)
    }

}