import { createRouter, createWebHistory } from "vue-router";

//components
import ContractorsList from "./pages/contractors/ContractorsList.vue";
import ContractorDetails from "./pages/contractors/ContractorDetails.vue";
import ContactForm from "./pages/contractors/ContactForm.vue";
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
      children: [{ path: "contact", component: ContactForm, props: true }],
    },
  ],
});

export default router;
