import C from "../constants"

export default function (state = [], action) {
    const {type, payload} = action;
    switch (type) {
        case C.LODE_TASK:
            return payload;
        case C.ADD_TASK:
            return [...state, payload];
        case C.TOGGLE_TASK:
            return state.map(task =>
                task._id === payload._id ? {...task, status: !task.status} : task);
        case C.DEL_TASK:
            return state.filter(task =>
                task._id !== payload._id);
        default:
            return state
    }

}