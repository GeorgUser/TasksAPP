import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import { addTask } from "../../actions/tasksAct";


function NewTask({addTask}) {
    const [task, getTask] = useState("");

    const handleChange = ({target}) => getTask(target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        const taskData = {title: task, status: false};
        addTask(taskData);
        getTask('');
    };



    return (
        <form onSubmit={handleSubmit} className="form">
            <div className="newTask">
                <input
                    type="text"
                    onChange={handleChange}
                    value={task}
                    className="form-control"
                />
                <input
                    className="btn btn-primary"
                    type="submit"
                    value="ADD TASK"
                />
            </div>
        </form>
    )
}

function mapStateToProps(state) {
    return {state}
}

NewTask.propTypes = {
    addTask: PropTypes.func.isRequired,
}



export default connect(mapStateToProps,{addTask})(NewTask);