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
        select *
        from users;
    `

    const result = await postgres.execute(query)

    const students = result.rows.map(r => {
        return {
            firstName: r.first_name,
            lastName: r.last_name,
            email: r.email,
            userHandle: r.user_handle,
            cohort: r.cohort_id
        }
    })
    return students
}
export function create(user, cohort_id){
    const query= `
        insert into users (first_name, last_name, email, joined_date, is_admin, cohort_id)
        values ($1, $2, $3, $4, $5, $6) 
        returning * ;
    `

    const params = [user.firstName, user.lastName , user.email, new Date(), user.isAdmin, cohort_id]
    
    const queryPromise = postgres.execute(query, params)

    const userPromise = queryPromise.then(function(result){
        const user = result.rows[0]
        return {
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            userHandle: user.user_handle,
            isAdmin: user.is_admin
        }
    })
    return userPromise
}

