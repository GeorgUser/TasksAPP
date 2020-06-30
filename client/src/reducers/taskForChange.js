import C from "../constants";

export default function (state = null, action) {
    const {type, payload} = action;
    switch (type) {
        case C.CHANGE_TASK:
            return payload;
        default:
            return state
    }
}