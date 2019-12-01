const setInfo = (info) => {
    return {
        type: "SET",
        info: info
    }
}

const resetInfo = () => {
    return {
        type: "RESET"
    }
}

const reducer = (state = "", action) => {
    console.log(action.info)
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
export { setInfo, resetInfo }