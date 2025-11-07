import { createRouter, createWebHistory } from "vue-router";
import store from "./store";

//components
import ContractorsList from "./pages/contractors/ContractorsList.vue";
import ContractorDetails from "./pages/contractors/ContractorDetails.vue";
import ContactForm from "./pages/contractors/ContactForm.vue";
import RequestList from "./pages/requests/RequestList.vue";
import AuthForm from "./pages/auth/AuthForm.vue";
import ContractorRegistration from "./pages/auth/contractor-registration/ContractorRegistration.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/contractors" },
    {
      path: "/contractors",
      component: ContractorsList,
    },
    {
      path: "/contractors/:id",
      component: ContractorDetails,
      props: true,
      meta: { requiresAuth: true },
      children: [{ path: "contact", component: ContactForm, props: true }],
    },
    {
      path: "/requests",
      component: RequestList,
      meta: { requiresAuth: true },
    },
    { path: "/auth", component: AuthForm, meta: { requiresUnAuth: true } },
    {
      path: "/registration",
      component: ContractorRegistration,
      props: { edit: false },
      meta: { requiresAuth: true },
    },
    {
      path: "/edit",
      component: ContractorRegistration,
      props: { edit: true },
      meta: { requiresAuth: true },
    },
  ],
});

/* we use beforeEach on router to prevent unauthorized users to acces pages.
We need to check each route and see if route have some metadata that should 
prevent some users to access page. */
router.beforeEach(function (to, _, next) {
  const isAuthenticated = store.getters["auth/isAuthenticated"];
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/auth");
  } else if (to.meta.requiresUnAuth && isAuthenticated) {
    next("/contractors");
  } else {
    next();
  }
});
export default router;
