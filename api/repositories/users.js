import * as postgres from './postgres'

export function get(email){
    const query= `
        select * 
        from users 
        where email = $1;
    `

    postgres.execute(query, [email]).then(function(results){
        console.log('user:', results.rows[0])
    })
}

