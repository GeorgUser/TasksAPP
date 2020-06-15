import React from 'react';
import Message from './Message';
import PropTypes from 'prop-types';
import {connect} from "react-redux";


const TasksListHistory = ({tasks}) => {

    return (
        <>
            <h3>History</h3>
            <ul className="list-unstyled list">
                {tasks.length ? tasks.map((task) =>
                    <p key={task._id}>{task.title}</p>
                ) : <Message/>}
            </ul>
        </>
    )
};

TasksListHistory.propTypes = {
    tasks: PropTypes.array,
}

function mapStateToProps(state) {
    return {
        tasks: state.tasks.filter(task => task.status === true)
    }
}


export default connect(mapStateToProps)(TasksListHistory);