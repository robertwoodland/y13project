import { Dropdown } from "react-bootstrap";

export default function RecentProject(props){
    const {text} = props
    const {setSelectedProject} = props
    return <Dropdown.Item onClick={() => setSelectedProject(text)}>{text}</Dropdown.Item>;
} 