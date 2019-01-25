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

export async function getCohort() {
    const query = `
    select id, name, first_name, last_name,cohort_id 
    from cohort join users on id = users.cohort_id;
`

    const results = await postgres.execute(query)

    const cohortPromise = results.rows.map(r => {
        return {
            id: r.id,
            name: r.name,
            firstName: r.first_name,
            lastName: r.last_name,

        }
    })
    return cohortPromise
}

