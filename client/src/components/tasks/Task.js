import React from "react";
import {connect} from "react-redux";
import { doneTask, delTask } from "../../actions/tasksAct";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrashAlt, faUndo, faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import Spinner from "../Spinner";

function Task({task, doneTask, delTask}) {

    const [load, getLoad] = useState(false);
    const done = () => {
        doneTask({...task, status: !task.status})
    };

    const del = () => {
        delTask(task)
    };

    return (
        <li className="task-block">
            <div className="task">
               <p>{task.status && <FontAwesomeIcon icon={faCheckDouble} />} {task.title}</p>
            </div>
            {load ? (<Spinner main={task.status ? '#dc3545' : '#28a745'}/>)
                :
                (<div className="btnBlock">
                    <button onClick={on ? del : done} className="btn btn-success">
                    </button>
                    <button onClick={on ? (hideConfirm) : (task.status ? showConfirm : update)}
                            className={task.status ? "btn btn-danger" : "btn btn-primary"}>
                        <FontAwesomeIcon icon={on ? faTimes : (task.status ? faTrashAlt : faPen)}/>
                    </button>
                </div>)
            }
        </li>
    )
}

function mapStateToProps(state){
    return {state}
}

Task.propTypes = {
    doneTask: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, {doneTask, delTask})(Task);