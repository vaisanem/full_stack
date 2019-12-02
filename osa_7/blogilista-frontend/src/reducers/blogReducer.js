const init = (blogs) => {
    return {
        type: "INIT",
        blogs: blogs
    }
}

const add = (blog) => {
    return {
        type: "ADD",
        blog: blog
    }
}

const vote = (id) => {
    return {
        type: "VOTE",
        id: id
    }
}

const remove = (id) => {
    return {
        type: "REMOVE",
        id: id
    }
}

const reducer = (state = [], action) => {
    console.log(action.type, state)
    switch(action.type) {
        case "INIT":
            return action.blogs
        case "ADD":
            return state.concat(action.blog)
        case "VOTE":
            return state.map(one => {
                if (one.id === action.id) one.likes++
                return one
            })
        case "REMOVE":
            return state.filter(one => one.id !== action.id)
        default: return state
    }
}

export default reducer
export { init, add, vote, remove }