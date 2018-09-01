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

export function create(user){
    const query= `
        insert into users (first_name, last_name, email, joined_date)
        values ($1, $2, $3, $4) 
        returning * ;
    `

    const params = [user.firstName, user.lastName , user.email, new Date]
    
    const queryPromise = postgres.execute(query, params)

    const userPromise = queryPromise.then(function(result){
        const user = result.rows[0]
        return {
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            userHandle: user.user_handle
        }
    })
    return userPromise
}

