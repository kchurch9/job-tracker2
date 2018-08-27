//delete dummy data
//connect to database
const express = require('express') //imports
const cors = require('cors') //imports
const bodyParser = require('body-parser') //imports

const app = express() //Creates an Express application. The express() function is a top-level function exported by the express module.

app.use(cors()) //layers of express middleware 
app.use(bodyParser.json())//deserializes request.body(req) from to json to object

const users = [ // initializing a user variable to a  array of (user) objects
    {email: 'bob', password:'1234', isAdmin:true},
    {email:'hanes',password:'123'}
]

app.post('/login', handleLoginRequest) //tell app to call handleLoginRequest, when it get post requet to login

function handleLoginRequest(req, res) { 
    const typedEmail =req.body.email
    const typedPassword = req.body.password //this is an example of a variable you stupid fucker
    
    let user =null //initialized to null
    for (let i = 0; i < users.length; i++){
        const dbuser = users[i]
        if (dbuser.email === typedEmail && dbuser.password ===typedPassword){
            user = dbuser //reassigned to dbuser
        }
    }
    
    if (user !== null){
        res.send(user)
    } 
    else{
        res.sendStatus(401)//unauthorized
    }
}

app.listen(4001, () => console.log('example app listening on port 4001'))