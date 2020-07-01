import React from 'react';
import {Route} from "react-router-dom";
import Nav from "./Nav";
import {Async, lazyImport} from "./Async";
import LogIn from "./forms/LogIn";

const SignUp = Async(lazyImport("./forms/SignUp"));
const NewTask = Async(lazyImport("./forms/NewTask"));
const TasksList = Async(lazyImport("./tasks/TasksList"));

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
