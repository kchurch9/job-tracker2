import express from 'express'
import wrapAsyncRoute from '../util/wrapAsyncRoute'
import verifyJWT from '../middlewares/verifyJWT'
import * as applicationRepository from '../repositories/applications'
import * as companiesRepository from '../repositories/companies'

const router = express.Router()

router.get('/applications/:userId?', verifyJWT, wrapAsyncRoute(handleGetUserApplications))
async function handleGetUserApplications(req, res){
    //get user handle
    const userHandle = req.params.userId || req.userHandle
    //get all applications made by user
    const applications = await applicationRepository.getAllByUser(userHandle)
    //send them to the front end
    res.send(applications)

}

router.post('/application', verifyJWT, wrapAsyncRoute(handleNewApplication))
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

router.put('/application', verifyJWT, wrapAsyncRoute(handleUpdateApplication))
async function handleUpdateApplication(req, res){
    const application = req.body
    await applicationRepository.update(application)
    res.send()
}

router.delete('/application', verifyJWT, wrapAsyncRoute(handleDeleteApplication))
async function handleDeleteApplication(req,res){

    await applicationRepository.deleteApplication(req.query.id)

    res.send()
}

export default router