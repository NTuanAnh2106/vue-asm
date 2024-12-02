import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import Account from "../components/Account.vue";
import Register from "../components/Register.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { showToastWarning } from "@/utils/toastHandle";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login,
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
    },
    {
      path: "/home",
      name: "DefaultLayout",
      component: DefaultLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: "/home",
          name: "home",
          component: Home,
          meta: { requiresAuth: true },
        },
        {
          path: "/account",
          name: "Account",
          component: Account,
          meta: { requiresAuth: true },
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  // const isAuthenticated = false;
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !isAuthenticated
  ) {
    showToastWarning("Vui lòng đăng nhập!");
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
