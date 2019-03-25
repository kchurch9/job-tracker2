import express from 'express'
import wrapAsyncRoute from '../util/wrapAsyncRoute'
import * as usersRepository from '../repositories/users'
import bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import config from '../config'
import * as cohortRepository from '../repositories/cohort'
import * as passhashRepository from '../repositories/passhash'

const router = express.Router()

router.post('/api/login', handleLoginRequest)
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

router.post('/api/user', wrapAsyncRoute(handleUserSignUp)) //express when you get a post request to /user call handle user signup
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

export default router