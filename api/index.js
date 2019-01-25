import * as applicationRepository from './repositories/applications'
import * as companiesRepository from './repositories/companies'
import * as usersRepository from './repositories/users'
import * as postgres from './repositories/postgres'
import bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import express from 'express' //imports
import cors from 'cors' //imports
import * as bodyParser from 'body-parser' //imports
import * as passhashRepository from './repositories/passhash'
import * as cohortRepository from './repositories/cohort'
import verifyJWT from './middlewares/verifyJWT'
import config from './config'
import * as path from 'path'

const app = express() //Creates an Express application. The express() function is a top-level function exported by the express module.

postgres.connect()

app.use(cors()) //layers of express middleware 
app.use(bodyParser.json())//deserializes request.body(req) from to json to object


app.post('/login', handleLoginRequest) //tell app to call handleLoginRequest, when it get post request to login

function handleLoginRequest(req, res) { 
    const typedEmail =req.body.email   //(creating the variable) `request has a property called body and body is also an object and it ahs a probpery called email.
    const typedPassword = req.body.password //this is an example of a variable you stupid fucker

    // const user = getUser(typedEmail, typedPassword) //calling getUser with typedEmail, typedPassword
    const promise = usersRepository.get(typedEmail)

    promise.then(function(user){
        if (user !== null && user !== undefined){
            const credsMatchPromise = bcrypt.compare(typedPassword, user.passhash)
            credsMatchPromise.then(function(credsMatch){
                console.log('credsmatch:',credsMatch)
                if (credsMatch === true){
                    const payload= {userHandle: user.userHandle}
                    const options= {expiresIn:24*60*60}
                    const token =jwt.sign(payload, config.jwtSecret, options)
                    const response = {token: token, user: user}
                    res.cookie('jwt',token, { maxAge: 24*60*60, httpOnly: true })
                    res.send(response)
                }
                else {
                    console.log('badpassword')
                    res.sendStatus(401)//unauthorized password
                }

            })
            
        }   
        else{
            res.sendStatus(401)//unauthorized
            
        }
            
    })
}

function wrapAsyncRoute(routeHandler) {
    return function(req, res, next) {
        const promise = routeHandler(req, res)
        promise.catch(function(error) {
            next(error)
        })
    }
}
app.get('/applications/:userId?', verifyJWT, wrapAsyncRoute(handleGetUserApplications))

async function handleGetUserApplications(req, res){
    //get user handle
    const userHandle = req.params.userId || req.userHandle
    //get all applications made by user
    const applications = await applicationRepository.getAllByUser(userHandle)
    //send them to the front end
    res.send(applications)

} 


app.post('/application', verifyJWT, wrapAsyncRoute(handleNewApplication))

async function handleNewApplication(req, res){
    const companyId = await getCompanyId(req.body.company)
    // insert into the applications table
    const application = await applicationRepository.create(req.userHandle, req.body.position, companyId, req.body.date)
    // combine info from two tables and send to user front end
    res.send(application)
    
}

async function getCompanyId(companyName){
    // see if company exists
    const company = await companiesRepository.getCompanyByName(companyName)
    // if it doesnt exist create new company
    if (company === null){
        const company = await companiesRepository.create(companyName)
        // return new company id
        return company.id
    }
    //if company exists then get company ID and return 
    return company.id

}
app.put('/application', verifyJWT, wrapAsyncRoute(handleUpdateApplication))

async function handleUpdateApplication(req, res){
    const application = req.body
    await applicationRepository.update(application)
    res.send()
}

app.post('/user', wrapAsyncRoute(handleUserSignUp)) //express when you get a post request to /user call handle user signup

async function handleUserSignUp(req,res) {
    const cohort = await cohortRepository.getCohortByCode(req.body.cohort)
    if (cohort === null) {
        res.send('denied')
        return
    }
    console.log('whole body', req.body)
    const user = await usersRepository.create(req.body, cohort)
    const userHandle = user.userHandle
    const password = req.body.password
    const hash = await bcrypt.hash(password, 3)

    await passhashRepository.create(userHandle,hash)
    res.send(user)
}

app.get('/students', verifyJWT, wrapAsyncRoute(handleGetStudents))

async function handleGetStudents(req,res){
    //get students from users repo
    const allStudents = await usersRepository.getStudents()
    //return all
    res.send(allStudents)
}
app.get('/companies', verifyJWT, wrapAsyncRoute(handleGetCompanies))

async function handleGetCompanies(req,res){
    const allCompanies = await companiesRepository.getCompanies()

    res.send(allCompanies)
}

app.get('/users', verifyJWT, wrapAsyncRoute(handleGetCohortStudents))

async function handleGetCohortStudents(req,res) {
    const Cohort = await usersRepository.getCohortStudents()

    res.send(Cohort)
}
app.get('/cohort', verifyJWT, wrapAsyncRoute(handleGetCohort))

async function handleGetCohort(req,res) {
    const allCohort = await cohortRepository.getCohort()

    res.send(allCohort)
}
app.delete('/application', verifyJWT, wrapAsyncRoute(handleDeleteApplication))

async function handleDeleteApplication(req,res){
    await applicationRepository.deleteApplication(req.query.id)

    res.send()
}
// function getUser (email, password){
//     let user =null //initialized to null
//     for (let i = 0; i < users.length; i++){
//         const dbuser = users[i]
//         if (dbuser.email === email && dbuser.password === password){
//             user = dbuser //reassigned to dbuser
//         }
//      }
//      return user 
//}

app.use(express.static(path.resolve(__dirname, '../client/dist')))
app.use('*', express.static(path.resolve(__dirname, '../client/dist/index.html')))

const port = process.env.PORT || 4001
app.listen(port, () => console.log(`example app listening on port ${port}`))