import * as postgres from './postgres'

export async function getAllByUser(userHandle){
    const query= `
        select * from applications ()
    `
}


export async function create(userHandle, position, companyId, date){
    const query= `
        insert into applications (user_handle, position, company_id, date)
        values ($1, $2, $3, $4) 
        returning * ;
    `

    const params = [userHandle, position, companyId, date]
    
    const queryResults = await postgres.execute(query, params)
    
    const application = queryResults.rows[0]
    return {
        userHandle: application.user_handle,
        position: application.position,
        companyId: application.company_id,
        date: application.date
    }
}
