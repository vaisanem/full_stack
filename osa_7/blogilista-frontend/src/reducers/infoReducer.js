const set = (info) => {
    return {
        type: "SET",
        info: info
    }
}

const reset = () => {
    return {
        type: "RESET"
    }
}

const reducer = (state = "", action) => {
    switch(action.type) {
        case "SET":
            return action.info
        case "RESET":
            return ""
        default:
            return state
    }
}

export default reducer
export { set, reset }