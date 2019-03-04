import express from 'express'
import wrapAsyncRoute from '../util/wrapAsyncRoute'
import verifyJWT from '../middlewares/verifyJWT'
import * as usersRepository from '../repositories/users'

const router = express.Router()

router.get('/users', verifyJWT, wrapAsyncRoute(handleGetCohortStudents))//todo update endpoint url to be more consistent with use
async function handleGetCohortStudents(req,res) {
    const cohort = await usersRepository.getCohortStudents(req.query.id)

    res.send(cohort)
}

export default router