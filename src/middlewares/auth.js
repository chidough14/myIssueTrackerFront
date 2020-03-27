export default function auth({next, router}) {
    if(!localStorage.getItem('token')) {
       return router.push({name: 'login'})
       //window.location.href = "/login"
    }

    return next()
}