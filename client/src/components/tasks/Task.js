import React from "react";
import { connect } from "react-redux"
import { doneTask, delTask } from "../../actions/tasksAct";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrashAlt, faUndo, faCheckDouble } from '@fortawesome/free-solid-svg-icons';

function Task({task, doneTask, delTask}) {

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

            <div className="btnBlock">
                <button onClick={done} className="btn btn-success">
                    <FontAwesomeIcon icon={task.status ? faUndo : faCheck} />
                </button>
                <button onClick={del} className="btn btn-danger">
                    <FontAwesomeIcon icon={faTrashAlt} />
                </button>
            </div>
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