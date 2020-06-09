import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import firebase from 'firebase'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/add',
    name: 'Add',
    component: () => import('../views/AddRezept.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/view/:id',
    name: 'View',
    component: () => import('../views/ViewRezept.vue'),
    meta: {
      requiresOwner: true
    }
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: () => import('../views/EditRezept.vue'),
    meta: {
      requiresOwner: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Settings.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {

  //check for auth guard
  if(to.matched.some(record => record.meta.requiresAuth)) {
    console.log(firebase.auth().currentUser)
    // Check if NOT logged in
    if (!firebase.auth().currentUser) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    }else {
      // Proceed to route
      next()
    }
  } else if(to.matched.some(record => record.meta.requiresGuest)) {
    // Check if logged in
    if (firebase.auth().currentUser) {
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    }else {
      // Proceed to route
      next()
    }
  } else if(to.matched.some(record => record.meta.requiresOwner)) {
    //Get Creator of Recipe
    firebase.firestore().collection('rezepte').doc(to.params.id).get()
    .then(doc => {
         return doc.data().ersteller
    })
    .then(ersteller => {
      // Check if logged in
      if (!firebase.auth().currentUser) {
        next({
          path: '/login',
          query: {
            redirect: to.fullPath
          }
        });
        //check Ownership
      }else if (firebase.auth().currentUser.email != ersteller) {
        next({
          path: '/',
          query: {
            redirect: to.fullPath
          }
        });
      } else {
        // Proceed to route
        next()
      }
    })
    
  } else {
    // Proceed to route
    next()
  }
})
export default router
