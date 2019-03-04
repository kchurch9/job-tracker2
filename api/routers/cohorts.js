import express from 'express'
import wrapAsyncRoute from '../util/wrapAsyncRoute'
import verifyJWT from '../middlewares/verifyJWT'
import * as cohortRepository from '../repositories/cohort'

const router = express.Router()

router.get('/cohort', verifyJWT, wrapAsyncRoute(handleGetCohort))
async function handleGetCohort(req,res) {
    const allCohort = await cohortRepository.getCohort()

    res.send(allCohort)
}

export default router