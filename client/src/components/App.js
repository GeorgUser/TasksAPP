import React, {useState, useEffect} from 'react';
import {Route} from "react-router-dom";
import Nav from "./Nav";
import {setAuthorizationHeader} from "../api";
import {Async, lazyImport} from "./Async";
import LogIn from "./forms/LogIn";

const SignUp = Async(lazyImport("./forms/SignUp"));
const NewTask = Async(lazyImport("./forms/NewTask"));
const TasksList = Async(lazyImport("./tasks/TasksList"));

const App = () => {
    const [token, setToken] = useState(null);

    useEffect(()=>{
        setToken(localStorage.getItem('userToken'));
        setAuthorizationHeader(token);
    }, [token]);

    const login = token => {
        setToken(token);
        setAuthorizationHeader(token);
        localStorage.userToken = token;
    };

    const logout = () => {
        setToken(null);
        setAuthorizationHeader();
        delete localStorage.userToken;
        console.log(token, "logout")
    };

    return (
        <div className="container">
            <div className="tableToDo">
                { token && <Nav logout={logout}/>}
                <Route exact path="/" render={(props) => <LogIn {...props} login={login}/>}/>
                <Route exact path="/SignUp" component={SignUp}/>
                <Route path="/tasks" render={(props) => <NewTask {...props} token={token}/>}/>
                <Route path="/tasks" render={(props) => <TasksList {...props} token={token} state={false} title={"Your tasks"}/>}/>
                <Route path="/history" render={(props) => <TasksList {...props} token={token} state={true} title={"History"}/>}/>
            </div>
        </div>)
};

export default App;
