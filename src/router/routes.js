const routes = [
  { path: "/auth", component: () => import("pages/Auth.vue") },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      { path: "projets", component: () => import("pages/Projets.vue") },
      { path: "projets/:id", component: () => import("pages/Projet.vue") },
      {
        path: "creer-projet",
        component: () => import("pages/CreerProjet.vue")
      },
      { path: "clients", component: () => import("pages/Clients.vue") },
      { path: "clients/:id", component: () => import("pages/Client.vue") },
      { path: "creer-client", component: () => import("pages/CreerClient.vue") }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
