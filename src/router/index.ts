import Vue from "vue";
import Router from "vue-router";

import pages from "./routers";

Vue.use(Router);

const router = new Router({
  mode: "hash",
  routes: [...pages],
});

router.beforeEach((to: any, from, next) => {
  const { title } = to.meta;
  document.title = title;
  next();
});

export default router;
