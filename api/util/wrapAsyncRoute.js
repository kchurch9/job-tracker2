export default function wrapAsyncRoute(routeHandler) {
    return function(req, res, next) {
        const promise = routeHandler(req, res)
        promise.catch(function(error) {
            next(error)
        })
    }
}