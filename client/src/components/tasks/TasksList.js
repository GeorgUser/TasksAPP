import React, {memo, useEffect} from 'react';
import Task from './Task';
import Message from './Message';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {loadTasksAction} from "../../actions/tasksAct";

const TasksList = memo(({ tasks, title, loadTasksAction }) => {

    useEffect(() => {
        if(tasks.length === 0) loadTasksAction().catch(err => alert(err));
        // eslint-disable-next-line
    },[]);

    console.log('taskList === render');
    return (
        <>
            <h3>{title}</h3>
            <ul className="list-unstyled list">
                {tasks.length ? tasks.map((task, i) => (
                        <div key={task._id} className="task">
                            <span className="taskNum">{i+1}.</span>
                            <Task task={task}/>
                        </div>
                    )
                ) : <Message/>}
            </ul>
        </>
    )
});

function mapStateToProps(state, ownProps) {
    return{
        tasks: state.tasks.filter(task => task.status === ownProps.state) || [],
    }
}

TasksList.propTypes = {
    tasks: PropTypes.array.isRequired,
    title: PropTypes.string,
};

TasksList.defaultProps = {
    title: "Tasks",
};

export default connect(mapStateToProps, {loadTasksAction})(TasksList);
