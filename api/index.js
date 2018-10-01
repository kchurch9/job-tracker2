import * as applicationRepository from './repositories/applications'
import * as companiesRepository from './repositories/companies'
import * as usersRepository from './repositories/users'
import * as postgres from './repositories/postgres'
import bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
//delete dummy data
//connect to database
import express from 'express' //imports
import cors from 'cors' //imports
import * as bodyParser from 'body-parser' //imports
import * as passhashRepository from './repositories/passhash'
import verifyJWT from './middlewares/verifyJWT'
import config from './config'

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

app.post('/application', wrapAsyncRoute(handleNewApplication))

async function handleNewApplication(req,res){
    // get id of company
    const companyId = await getCompanyId(req.body.company)
    // insert into the applications table
    const application = await applicationRepository.create(req.body.position, companyId, req.body.date)
    // combine info from two tables and send to user front end
    res.send(application)
    
}

async function getCompanyId(companyName){
    // see if company exists
    const company = await companiesRepository.getCompanyByName(companyName)
    // if it doent exist create new company
    if (company === null){
        const company = await companiesRepository.create(companyName)
        // return new company id
        return company.id
    }
    //if company exists then get company ID and return 
    return company.id

}

app.post('/user', handleUserSignUp) //express when you get a post request to /user call handle user signup 

function handleUserSignUp(req,res){
    console.log('whole body',req.body)
    const userPromise = usersRepository.create(req.body)

    userPromise.then(function(user){
        const userHandle = user.userHandle
        const password = req.body.password
        const bcryptPromise = bcrypt.hash(password, 3)
        bcryptPromise.then(function(hash) {
          const passhashPromise = passhashRepository.create(userHandle,hash)
          passhashPromise.then(function(){
              res.send(user) // this line sends the reponse to the front end
          })
        })
        
    })
}

app.get('/admin', verifyJWT, handleAdmin)

function handleAdmin(req,res){
    res.send('666')

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
app.listen(4001, () => console.log('example app listening on port 4001'))