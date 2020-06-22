import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {addTask, toggleTask} from "../../actions/tasksAct";
import Spinner from "../Spinner";


function NewTask({addTask, taskForChange, toggleTask}) {

    const [load, getLoad] = useState(false);

    const [task, getTask] = useState({
        title: '',
        status: false
    });

    useEffect(() => {
        if (taskForChange !== null) getTask(taskForChange);
    }, [taskForChange]);

    const handleChange = ({target}) => getTask({
        ...task, title: target.value
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        getLoad(true);
        if (taskForChange) {
            getTask(taskForChange);
            toggleTask(task).then(() => getLoad(false));
        } else {
            setTimeout(
            addTask(task).then(() => getLoad(false)),5000);
        }

        getTask({
            title: '',
            status: false
        });
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <div className="newTask">
                <input
                    type="text"
                    onChange={handleChange}
                    value={task.title}
                    className="form-control"
                />
                {load ? (<Spinner/>)
                    :
                    (<input
                        className="btn btn-primary"
                        type="submit"
                        value={task._id ? 'UPDATE' : 'ADD TASK'}
                    />)
                }
            </div>
        </form>
    )
}

function mapStateToProps(state) {
    return {state}
}

NewTask.propTypes = {
    addTask: PropTypes.func.isRequired,
};


export default connect(mapStateToProps, {addTask, toggleTask})(NewTask);
