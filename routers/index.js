const errorHandle = require("../middlewares/errorHandle");
const cauhinhRouter = require("./cauhinhRouter");

module.exports = (app) => {
  app.use("/api", cauhinhRouter);

  // Middleware handle error
  app.use(errorHandle);
};
