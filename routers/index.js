const errorHandle = require("../middlewares/errorHandle");
const cauhinhRouter = require("./cauhinhRouter");
const laptopRouter = require("./laptopRouter");
const ruleRouter = require("./ruleRouter");
const handleRouter = require("./handleRouter");

module.exports = (app) => {
  app.use("/api", cauhinhRouter);
  app.use("/api", laptopRouter);
  app.use("/api", ruleRouter);
  app.use("/api", handleRouter);

  // Middleware handle error
  app.use(errorHandle);
};
