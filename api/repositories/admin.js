import * as postgres from './postgres'

export async function getAllByUser(userHandle){
    const query= `
        select *
        from users
        where user.last_name, user.first_name = $1;
    `
    const params = [email]

    const queryPromise = postgres.execute(query,params)

    const userPromise = queryPromise.then(function(results){
        const user = result.rows[0]
        if (!user){
            return null
        }

        return {
            lastName: user.last_name,
            firstName: user.first_name,
            email: user.email,
            userHandle: user.user_handle
        }
    })
    return userPromise
}