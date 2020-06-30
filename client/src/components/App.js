import React from 'react';
import NewTask from './forms/NewTask';
import TasksList from './tasks/TasksList';
import {Route} from "react-router-dom"
import Nav from "./Nav";
import LogIn from "./forms/LogIn";
import SignUp from "./forms/SignUp";


const App = () => {

    console.log('app === render');
    return (
    <div className="container">
        <div className="tableToDo">
            <Nav/>
            <Route exact path="/" component={LogIn} />
            <Route exact path="/SignUp" component={SignUp} />
            <Route path="/tasks" render={(props)=> <NewTask {...props}/>} />
            <Route path="/tasks" render={(props)=><TasksList {...props} state={false} title={"Your tasks"}/>} />
            <Route path="/history" render={(props)=><TasksList {...props} state={true} title={"History"}/>} />
        </div>
    </div>)
};


export default App;
