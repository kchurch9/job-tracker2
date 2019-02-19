import {Client} from 'pg'

let client

export function connect(){
    client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production'
    })

    console.log('connecting to database')
    client.connect().then(function(){
        console.log('connected')
    })
}

export function execute(query, params) {
    return client.query(query, params)
}
