import axios from "axios";


const api = {
    tasks: {
        allTasks: () => axios.get("http://18.218.143.75:4000/api/tasks").then(res => res.data.tasks),
        create: task => axios({
            url: "http://18.218.143.75:4000/api/tasks",
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            data: JSON.stringify(task)
        }).then(res => res.data.task),
        update: task => axios.put(`http://18.218.143.75:4000/api/tasks/${task._id}`, {task}).then(res => res.data.task),
        delete: task => axios.delete(`http://18.218.143.75:4000/api/tasks/${task._id}`).then(res => res.data.task),
    },
    users: {
        create: user => axios({
            url: "http://18.218.143.75:4000/api/users",
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            data: JSON.stringify({user: {...user}})
        }),
        login: credentials => axios({
            url: "http://18.218.143.75:4000/api/auth",
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            data: JSON.stringify({credentials: {...credentials}})
        }).then(res => res.data.token),
    },
};

export const setAuthorizationHeader = (token = null) => {
    if(token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common.Authorization;
    }
};

export default api;
