import * as jwt from 'jsonwebtoken'
import config from '../config'


export default function verifyJWT(req,res,next){
    const jwtToken = req.headers['x-access-token']
    jwt.verify(jwtToken, config.jwtSecret, function(err, decodedPayload){
        if (err){
            console.error(err)
            res.status(401).send({ auth: false, message: 'Failed to authenticate token.'})
        }
        else{
            req.userHandle = decodedPayload.userHandle
            console.log('User handle:',req.userHandle)
            next()
        }
        
    })
}