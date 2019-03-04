import express from 'express'
import wrapAsyncRoute from '../util/wrapAsyncRoute'
import verifyJWT from '../middlewares/verifyJWT'
import * as companiesRepository from '../repositories/companies'

const router = express.Router()

router.get('/companies', verifyJWT, wrapAsyncRoute(handleGetCompanies))
async function handleGetCompanies(req,res){
    const allCompanies = await companiesRepository.getCompanies()

    res.send(allCompanies)
}

export default router