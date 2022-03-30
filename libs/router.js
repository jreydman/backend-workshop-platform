const path = require("path");
const {check} = require("express-validator")

const {
  ArticleRoutes,
  ServerRoutes,
  GroupRoutes,
  RuleRoutes,
  ComputerRoutes,
  StorageRoutes,
  CategoryRoutes,
  GenericRoutes,
  UserRoutes,
  TokenRoutes,
  ServerProfileRoutes,
  Swagger
} = require("../src/routes");

module.exports = (app, passport) => {

  app.use("/article", ArticleRoutes(passport));

  app.use('/user', UserRoutes)

  app.use("/server", ServerRoutes);

  app.use("/group", GroupRoutes);

  app.use("/rule", RuleRoutes);

  app.use("/computer", ComputerRoutes);

  app.use("/storage", StorageRoutes);

  app.use("/category", CategoryRoutes);

  app.use("/token", TokenRoutes);

  app.use("/srvprofile", ServerProfileRoutes);

  app.use("/", GenericRoutes)

  app.use('/api-docs', Swagger)

}