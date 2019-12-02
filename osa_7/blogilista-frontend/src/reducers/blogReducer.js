const initBlogs = (blogs) => {
    return {
        type: "INIT_BLOGS",
        blogs: blogs
    }
}

const addBlog = (blog) => {
    return {
        type: "ADD_BLOG",
        blog: blog
    }
}

const voteBlog = (id) => {
    return {
        type: "VOTE_BLOG",
        id: id
    }
}

const removeBlog = (id) => {
    return {
        type: "REMOVE_BLOG",
        id: id
    }
}

const reducer = (state = [], action) => {
    switch(action.type) {
        case "INIT_BLOGS":
            return action.blogs
        case "ADD_BLOG":
            return state.concat(action.blog)
        case "VOTE_BLOG":
            return state.map(one => {
                if (one.id === action.id) one.likes++
                return one
            })
        case "REMOVE_BLOG":
            return state.filter(one => one.id !== action.id)
        default: return state
    }
}

export default reducer
export { initBlogs, addBlog, voteBlog, removeBlog }