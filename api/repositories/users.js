import * as postgres from './postgres'

export function get(email){
    const query= `
        select * 
        from users join passhash on users.user_handle = passhash.user_handle
        where email = $1;
    `
    const params = [email]
    
    const queryPromise = postgres.execute(query, params)
    
    const userPromise = queryPromise.then(function(result){
        const user = result.rows[0]
        if (!user){
            return null
        }
        
        return {
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            userHandle: user.user_handle,
            cohort: user.cohort_id,
            passhash: user.passhash,
            isAdmin: user.is_admin
        }
    })
    
    return userPromise
}

export async function getStudents(){
    const query= `
        select user_handle, first_name, last_name, email, cohort_id, cohort.id, cohort.name as cohort_name
        from users join cohort on users.cohort_id = cohort.id;

    `
    const result = await postgres.execute(query)

    const students = result.rows.map(r => {
        return {
            firstName: r.first_name,
            lastName: r.last_name,
            email: r.email,
            userHandle: r.user_handle,
            cohort: r.cohort_name
        }
    })
    return students
}
export function create(user,cohort){
    const query= `
        insert into users (first_name, last_name, email, joined_date, is_admin, cohort_id)
        values ($1, $2, $3, $4, $5, $6) 
        returning * ;
    `

    const params = [user.firstName, user.lastName , user.email, new Date(), user.isAdmin, cohort.id]
    
    const queryPromise = postgres.execute(query, params)

    const userPromise = queryPromise.then(function(result){
        const user = result.rows[0]
        return {
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            userHandle: user.user_handle,
            isAdmin: user.is_admin,
            cohort:user.cohort_id
        }
    })
    return userPromise
}

export async function getCohortStudents() {
    const query = `
    select first_name, last_name, email 
    from users
    where cohort_id = $1;  
    returning *;
    
`

    const results = await postgres.execute(query)

    const getCohortStudents = results.rows.map(r => {
        return {
            id: r.id,
            name: r.name,
            firstName: r.first_name,
            lastName: r.last_name,

        }
    })
    return getCohortStudents
}