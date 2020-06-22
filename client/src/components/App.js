import React, {useEffect, useState} from 'react';
import NewTask from './forms/NewTask';
import TasksList from './tasks/TasksList';
import {Route} from "react-router-dom"
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import Nav from "./Nav";
import LogIn from "./forms/LogIn";
import {loadTasksAction} from "../actions/tasksAct";


const App = ({tasks, loadTasksAction}) => {

    const [taskForChange, getTaskForChange] = useState(null);

    const done = tasks.filter(task => task.status === true);
    const noDone = tasks.filter(task => task.status === false);

    const changeTask = task => {
        getTaskForChange(task);
        console.log(taskForChange);
    };

    useEffect(() => {
        loadTasksAction().catch(err => alert(err))
    },[loadTasksAction]);

    return (
    <div className="container">
        <div className="tableToDo">
            <Nav/>
            <Route exact path="/" component={LogIn} />
            <Route path="/tasks" render={()=> <NewTask taskForChange={taskForChange}/>} />
            <Route path="/tasks" render={()=><TasksList changeTask={changeTask} tasks={noDone} title={"Your tasks"}/>} />
            <Route path="/history" render={()=><TasksList tasks={done} title={"History"}/>} />
        </div>
    </div>)
};

function mapStateToProps(state) {
    return{
        tasks: state.tasks || [],
    }
}

App.propTypes = {
    tasks: PropTypes.array,
    loadCoursesAction: PropTypes.func,
};


export default connect(mapStateToProps,{loadTasksAction})(App);
