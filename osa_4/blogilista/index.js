const config = require('./utils/config')
//const app = require('./app')
const blog_controller = require('./controllers/blogs')

blog_controller.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})