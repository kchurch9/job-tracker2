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
        return user
    })
    
    return userPromise
}

