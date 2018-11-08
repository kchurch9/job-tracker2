export function getApplicationWithNextStatus(app){
    if (app.status==='Interested'){
        return {...app, status:'Applied'}
    }
    
    if (app.status==='Applied'){
        return {...app, status:'Phone Interview'}
    }
    
    if (app.status==='Phone Interview'){
        return {...app, status:'Interview'}
    }

    if (app.status==='Interview'){
        return {...app, status:'Results'}
    }
    return app
}

export function getApplicationWithPreviousStatus(app){
    if (app.status==='Results'){
        return {...app, status:'Interview'}
    }
    
    if (app.status==='Interview'){
        return {...app, status:'Phone Interview'}
    }
    
    if (app.status==='Phone Interview'){
        return {...app, status:'Applied'}
    }

    if (app.status==='Applied'){
        return {...app, status:'Interested'}
    }
    return app
}

