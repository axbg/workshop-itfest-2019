import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const baseUrl = "http://localhost:8000";
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    props: { baseUrl: baseUrl }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    props: { baseUrl: baseUrl }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (localStorage.getItem("token")) {
    if (to.name === "login") {
      next("/")
    } else {
      next();
    }
  } else if (to.name === "login") {
    next();
  } else {
    next("/login");
  }
});

export default router
