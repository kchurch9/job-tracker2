import * as postgres from './postgres'

export function create(userHandle, passhash){
    const query = `
        insert into passhash (user_handle, passhash, mod_date)    
        values ($1, $2, $3);
    `
    const params = [userHandle, passhash, new Date()]
    return postgres.execute(query,params)
}