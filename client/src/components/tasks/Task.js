import React, {useState} from "react";
import {connect} from "react-redux";
import {toggleTask, delTask, updateTaskForChange} from "../../actions/tasksAct";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck, faTrashAlt, faUndo, faCheckDouble, faPen, faTimes} from '@fortawesome/free-solid-svg-icons';
import Spinner from "../Spinner";


const Task = memo(({task, toggleTask, delTask, updateTaskForChange}) => {

    const [load, getLoad] = useState(false);
    const [on, setOn] = useState(false);

    const showConfirm = () => setOn(true);
    const hideConfirm = () => setOn(false);

    const done = () => {
        getLoad(true);
        toggleTask({...task, status: !task.status}).then(() => getLoad(false));
    };

    const update = () => {
        updateTaskForChange(task);
    };

    const del = () => {
        getLoad(true);
        delTask(task).then(() => getLoad(false));
    };

    return (
        <li className="task-block">
            <div className="task">
                <p>{task.status && <FontAwesomeIcon icon={faCheckDouble}/>} {task.title}</p>
            </div>
            {load ? (<Spinner main={task.status ? '#dc3545' : '#28a745'}/>)
                :
                (<div className="btnBlock">
                    <button onClick={on ? del : done} className="btn btn-success">
                        <FontAwesomeIcon icon={task.status && !on ? faUndo : faCheck}/>
                    </button>
                    <button onClick={on ? (hideConfirm) : (task.status ? showConfirm : update)}
                            className={task.status ? "btn btn-danger" : "btn btn-primary"}>
                        <FontAwesomeIcon icon={on ? faTimes : (task.status ? faTrashAlt : faPen)}/>
                    </button>
                </div>)
            }
        </li>
    )
});

function mapStateToProps(state) {
    return {state}
}

Task.propTypes = {
    task: PropTypes.object.isRequired,
    toggleTask: PropTypes.func.isRequired,
    delTask: PropTypes.func.isRequired,
    updateTaskForChange: PropTypes.func,
};


export default connect(mapStateToProps, {toggleTask, delTask, updateTaskForChange})(Task);
