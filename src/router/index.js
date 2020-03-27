import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/user/Login.vue'
import Register from '../views/user/Register.vue'
import ForgotPassword from '../views/user/ForgotPassword.vue'
import ResetPassword from '../views/user/ResetPassword.vue'
import Dashboard from '../views/pages/Dashboard.vue'
import Middlewares from '../middlewares/index.js'

Vue.use(VueRouter)

const routes = [
    {
       path: '/',
       name: 'home',
       component: Home 
    },
    {
        path: '/login',
        name: 'login',
        //component: ()=> import('../views/user/Login.vue'),
        meta: {
           middleware: [Middlewares.guest]
        },
        component: Login 
     },
     {
        path: '/register',
        name: 'register',
        //component: ()=> import('../views/user/Register.vue'),
        meta: {
            middleware: [Middlewares.guest]
         },
        component: Register 
     },
     {
         path: '/forgot-password',
         name: 'forgotPassword',
         //component: ()=> import('../views/user/Register.vue'),
         meta: {
            middleware: [Middlewares.guest]
         },
         component: ForgotPassword 
      },
      {
         path: '/reset-password',
         name: 'resetPassword',
         //component: ()=> import('../views/user/Register.vue'),
         meta: {
            middleware: [Middlewares.guest]
         },
         component: ResetPassword 
      },
     {
        path: '/dashboard',
        name: 'dashboard',
       // component: ()=> import('../views/pages/Dashboard.vue'),
        meta: {
            middleware: [Middlewares.auth]
         },
        component: Dashboard 
     },
]

const router = new VueRouter({
    mode: 'history',
    base:  process.env.BASE_URL,
    routes
})

function nextCheck(context, middleware, index) {
    const nextMiddleware = middleware[index]
    if(!nextMiddleware) return context.next

    return (...parameters) => {
       context.next(...parameters)
       const nextMidd = nextCheck(context, middleware, index + 1)

       nextMiddleware({...context, next: nextMidd})
    }
}


router.beforeEach((to, from, next)=> {
  // if (to.meta.middleware && to.path !== '/login') {
    if(to.meta.middleware && (to.path !== '/login' || to.path !== '/register')) {
        const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware]

        const ctx = {
           from,
           next,
           router,
           to
        }

        const nextMiddleware = nextCheck(ctx, middleware, 1)

        return middleware[0]({...ctx, next: nextMiddleware})
    } 

  /*  } else {
      return next()
   } */

    return next()
})

export default router