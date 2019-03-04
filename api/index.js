import * as dotenv from 'dotenv'
import * as postgres from './repositories/postgres'
import express from 'express'
import cors from 'cors'
import * as bodyParser from 'body-parser'
import * as path from 'path'
import applicationsRouter from './routers/applications'
import authRouter from './routers/auth'
import cohortsRouter from './routers/cohorts'
import companiesRouter from './routers/companies'
import studentsRouter from './routers/students'
import usersRouter from './routers/users'

dotenv.config({path:path.resolve(__dirname,'..','.env')})

const app = express()

postgres.connect()

app.use(cors())
app.use(bodyParser.json())

//router middleware functions
app.use(authRouter)
app.use(applicationsRouter)
app.use(cohortsRouter)
app.use(companiesRouter)
app.use(studentsRouter)
app.use(usersRouter)

//will serve files in the dist folder
const pathToDistFolder = path.resolve(__dirname, '../client/dist')
app.use(express.static(pathToDistFolder))

//will serve base html if the file doesnt exist above
const pathToDistIndexHTML = path.resolve(__dirname, '../client/dist/index.html')
app.use('*', express.static(pathToDistIndexHTML))

const port = process.env.PORT
app.listen(port, () => console.log(`example app listening on port ${port}`))