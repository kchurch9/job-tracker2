import * as usersRepository from './repositories/users'
import * as postgres from './repositories/postgres'
import bcrypt from 'bcrypt'
//delete dummy data
//connect to database
import express from 'express' //imports
import cors from 'cors' //imports
import * as bodyParser from 'body-parser' //imports


const app = express() //Creates an Express application. The express() function is a top-level function exported by the express module.

postgres.connect()

app.use(cors()) //layers of express middleware 
app.use(bodyParser.json())//deserializes request.body(req) from to json to object


app.post('/login', handleLoginRequest) //tell app to call handleLoginRequest, when it get post requet to login

function handleLoginRequest(req, res) { 
    const typedEmail =req.body.email   //(creating the variable) `request has a property called body and body is also an object and it ahs a probpery called email.
    const typedPassword = req.body.password //this is an example of a variable you stupid fucker

    // const user = getUser(typedEmail, typedPassword) //calling getUser with typedEmail, typedPassword
    const promise = usersRepository.get(typedEmail)

    promise.then(function(user){
        if (user !== null && user !== undefined){
            const credsMatchPromise = bcrypt.compare(typedPassword, user.passhash)
            console.log('laskdjfsdlakfj',typedPassword,user.passhash)
            credsMatchPromise.then(function(credsMatch){
                console.log('credsmatch:',credsMatch)
                if (credsMatch === true){
                    res.send(user)
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

app.post('/user', handleUserSignUp) //express when you get a post request to /user call handle user signup 

function handleUserSignUp(req,res){
    console.log('whole body',req.body)
    const promise = usersRepository.create(req.body)
    promise.then(function(user){
        res.send(user) // this line sends the reponse to the front end
    })
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