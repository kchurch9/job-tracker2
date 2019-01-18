import * as postgres from './postgres'

 export async function getCohortByCode(cohort_code) {
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

