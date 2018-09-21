import * as postgres from './postgres'



export function create(companies){
    const query= `
        insert into companies (company_name, position_applied, joined_date)
        values ($1, $2, $3) 
        returning * ;
    `

    const params = [companies.companyName, companies.application , new Date()]
    
    const queryPromise = postgres.execute(query, params)

    const userPromise = queryPromise.then(function(result){
        const user = result.rows[0]
        return {
            companyName: companies.company_name,
            application: companies.posistion_applied 
        }
    })
    return userPromise
}
