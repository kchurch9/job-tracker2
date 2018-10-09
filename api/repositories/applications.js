import * as postgres from './postgres'

export async function getAllByUser(userHandle){
    const query= `
        select * 
        from applications 
            join companies on companies.id = applications.company_id
        where user_handle = $1;
    `
    const params= [userHandle]

    const queryResults = await postgres.execute(query, params)

    const applications = queryResults.rows.map(row => {
        return {
            userHandle:row.user_handle,
            position:row.position,
            companyName:row.company_name,
            status:row.status,
            date:row.date
        }
    })
    return applications
}


export async function create(userHandle, position, companyId, date){
    const query= `
        insert into applications (user_handle, position, company_id, status, date)
        values ($1, $2, $3, $4, $5) 
        returning * ;
    `

    const params = [userHandle, position, companyId, 'Interested', date]
    
    const queryResults = await postgres.execute(query, params)
    
    const application = queryResults.rows[0]
    return {
        userHandle: application.user_handle,
        position: application.position,
        companyId: application.company_id,
        date: application.date
    }
}
