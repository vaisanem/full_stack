const setInfo = (info) => {
    return {
        type: "SET_INFO",
        info: info
    }
}

const resetInfo = () => {
    return {
        type: "RESET_INFO"
    }
}

const reducer = (state = "", action) => {
    switch(action.type) {
        case "SET_INFO":
            return action.info
        case "RESET_INFO":
            return ""
        default:
            return state
    }
}

export default reducer
export { setInfo, resetInfo }