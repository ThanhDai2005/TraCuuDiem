import examRoutes from "./exam.router.js";

export const mainRoutes = (app) => {
  const version = "/api";

  app.use(version + "/exams", examRoutes);
};
