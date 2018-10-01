import * as postgres from './postgres'


export async function create(position, companyId, date){
    const query= `
        insert into applications (position, company_id, date)
        values ($1, $2, $3) 
        returning * ;
    `

    const params = [position, companyId, date]
    
    const queryResults = await postgres.execute(query, params)
    
    const application = queryResults.rows[0]
    return {
        position: application.position,
        companyId: application.company_id,
        date: application.date
    }
}