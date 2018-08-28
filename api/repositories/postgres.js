import {Client} from 'pg'

let client

export function connect(){
    client = new Client({
        user:'admin',
        password:'admin',
        database: 'project'
    })
    
    console.log('connecting to database')
    client.connect().then(function(){
        console.log('connected')
    })
}

export function execute(query, params) {
    return client.query(query, params)
}
