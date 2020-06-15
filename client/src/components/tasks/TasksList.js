import React from 'react';
import Task from './Task';
import Message from './Message';
import PropTypes from 'prop-types';

const TasksList = ({tasks, title}) => {
    return (
        <>
            <h3>{title}</h3>
            <ul className="list-unstyled list">
                {tasks.length ? tasks.map((task, i) => (
                        <div key={task._id} className="task">
                            <span className="taskNum">{i+1}.</span>
                            <Task task={task}></Task>
                        </div>
                    )
                ) : <Message/>}
            </ul>
        </>
    )
};

TasksList.propTypes = {
    tasks: PropTypes.array.isRequired,
    title: PropTypes.string,
}

TasksList.defaultProps = {
    title: "Tasks",
}

export default TasksList;