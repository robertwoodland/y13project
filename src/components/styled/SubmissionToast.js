import { Fragment } from "react"
import { ToastContainer, Toast } from "react-bootstrap"

export default function SubmissionToast(props) {
    const {showToast, setShowToast} = props
    const {update} = props

    return(
        <Fragment>
            <ToastContainer className="p-3 mt-5" position={"top-center"}>
                <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
                    <Toast.Header>
                        <strong className="mx-auto">Tasks</strong>
                    </Toast.Header>

                    <Toast.Body>{update ? "Task updated in database" : "Task submitted to database"}</Toast.Body>
                </Toast>
            </ToastContainer>
        </Fragment>
    )
}
