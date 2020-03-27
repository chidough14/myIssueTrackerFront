export default function guest({next, router}) {
    if(localStorage.getItem('token')) {
        return router.push({name: 'dashboard'})
        //window.location.href = '/dashboard'
    }

    return next()
}