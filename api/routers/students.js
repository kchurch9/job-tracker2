import express from 'express'
import wrapAsyncRoute from '../util/wrapAsyncRoute'
import verifyJWT from '../middlewares/verifyJWT'
import * as usersRepository from '../repositories/users'

const router = express.Router()

router.get('/api/students', verifyJWT, wrapAsyncRoute(handleGetStudents))
async function handleGetStudents(req,res){
    //get students from users repo
    const allStudents = await usersRepository.getStudents()
    //return all
    res.send(allStudents)
}

export default router
