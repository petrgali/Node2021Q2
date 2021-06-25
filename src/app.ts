import express, { Application, Request, Response, NextFunction } from 'express'
import swaggerUI from 'swagger-ui-express'
import path from 'path'
import YAML from 'yamljs'
import userRouter from './resources/users/user.router'
import boardRouter from './resources/boards/board.router'
import taskRouter from './resources/tasks/task.router'
import loginRouter from './resources/login/login.router'
import logger from './middlewares/index'

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'))
const app: Application = express()

app.use(express.json())
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use(logger.requestDetails)
app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!')
    return
  }
  next()
})
app.use('/login', loginRouter)
app.use('/users', userRouter)
app.use('/boards', boardRouter)
app.use('/boards/:boardId/tasks', taskRouter)
app.use(logger.errorDetails)
export default app
