import * as postgres from './postgres'


export async function getCompanyByName(name){
    const query =`
        select id, company_name
        from companies
        where company_name = $1; 
    `

    const params = [name]

    const result = await postgres.execute(query, params)

    const company = result.rows[0]
    if (company===undefined){
        return null
    }
    return {
        id: company.id,
        name: company.company_name
    }
}

export function create(name){
    const query= `
        insert into companies (company_name)
        values ($1) 
        returning id, company_name;
    `

    const params = [name]
    
    const queryPromise = postgres.execute(query, params)

    const companyPromise = queryPromise.then(function(result){
        const company = result.rows[0]
        return {
            id: company.id,
            name: company.company_name
        }
    })
    return companyPromise
}

export function getCompanies(name){
    const query =`
    select id, company_name
    from companies
    `

    const queryPromise = postgres.execute(query)

    const companyPromise = queryPromise.then(function(result){
        const companies = result.rows
        return companies
    })
    return companyPromise
}