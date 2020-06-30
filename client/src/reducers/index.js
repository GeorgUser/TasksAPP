import { combineReducers } from "redux";
import tasks from "./tasks";
import taskForChange from "./taskForChange";


export default combineReducers({
    tasks,
    taskForChange
})