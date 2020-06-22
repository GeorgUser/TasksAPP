import C from "../constants";
import api from "../api";

export function loadTasksAction() {
    return function (dispatch) {
        return api.tasks.allTasks()
            .then(tasks => dispatch({
                type: C.LODE_TASK,
                payload: tasks
            })).catch(err => {
                throw err;
            })
    }
}

export function addTask(task) {
    return function (dispatch) {
        return api.tasks.create(task)
            .then(task => dispatch({
                    type: C.ADD_TASK,
                    payload: task
                })).catch(err => {
                throw err;
            })
    }
}

export function toggleTask(task) {
    return function (dispatch) {
        console.log(task);
        return api.tasks.update(task)
            .then(task => {
                console.log(task);
                return dispatch({
                    type: C.TOGGLE_TASK,
                    payload: task
                })
            }).catch(err => {
                throw err;
            })
    }
}

export function delTask(task) {
    return function (dispatch) {
        return api.tasks.delete(task)
            .then(task => dispatch({
                type: C.DEL_TASK,
                payload: task
            })).catch(err => {
                throw err;
            })
    }
}
