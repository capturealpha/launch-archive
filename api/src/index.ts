import express from 'express'
import cors from 'cors'
// import DeploymentRouter from './routers/deployment-router'

const app = express()
app.use(
  cors({
    origin: ((process.env.NOTEBOOKBOOST_CORS_WEBSITE_URLS?.split(',')) != null) || ['http://localhost:3000', 'http://localhost:3001'],
    optionsSuccessStatus: 200
  })
)

const { PORT = 3080 } = process.env
// app.use('/deployment', DeploymentRouter(null))
// console.log(process.env.API_VERSION, process.env.RPC_ENDPOINT)

async function initApp (): Promise<any> {
  try {
    return app.listen(PORT, () => {
      console.log(`server started at http://localhost: ${PORT}`)
    })
  } catch (err) {
    console.error('Error while initializing app', err)
    return await Promise.reject(err)
  }
}

await initApp()

export default app
