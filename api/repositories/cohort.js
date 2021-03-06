import * as postgres from './postgres'

 export async function getCohortByCode(code) {
     const query = `
        select id, name, code
        from cohort 
        where code = $1;
    `
     const params = [code]

     const results = await postgres.execute(query, params)

     const cohort = results.rows[0]
     if (cohort === undefined){
         return null
     }
     return{
         name:cohort.name,
         id:cohort.id
     }

}

export function getCohort(name){
    const query = `
    select id, name
    from cohort;
`
    const queryPromise = postgres.execute(query)

    const cohortPromise = queryPromise.then(function(result){
        const cohort = result.rows
        return cohort
    })
    return cohortPromise
}