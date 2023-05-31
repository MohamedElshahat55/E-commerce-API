const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const apiError = require("./utils/ApiError");
const dbConnection = require("./config/database");
const categoryRouter = require("./router/categoryRoute");
const subCategoryRouter = require("./router/subCategoryRoute");
const brandRouter = require("./router/brandRoute");
const productRouter = require("./router/productRoute");
const userRouter = require("./router/userRoute");
const authRouter = require("./router/authRoute");
const globalMiddleware = require("./middleware/globalMiddleware");

dotenv.config({ path: "config.env" });
//---CONNECT-WITH-DB----------------------------- \\
dbConnection();
//---EXPRESS-APP----------------------------- \\
const app = express();

//---MIDDLEWARES----------------------------- \\
// barsing middleware
app.use(express.json({ limit: "100kb" }));
// logger middleware
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
  console.log(`node:${process.env.NODE_ENV}`);
}
// Limit each IP to 100 requests per `window` (here, per 15 minutes)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message:
    "Too many accounts created from this IP, please try again after 15 minutes",
});

// Apply the rate limiting middleware to API calls only
app.use("/api", apiLimiter);

//---API-ROUTES----------------------------- \\
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/subcategories", subCategoryRouter);
app.use("/api/v1/brands", brandRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
//---API-ROUTES----------------------------- \\
//---NOT-FOUND-ROUTE------ \\
app.all("*", (req, res, next) => {
  next(new apiError(`can't find this route:${req.originalUrl}`, 400));
});
//---GLOBAL-ERROR-HANDLING-MIDDLEWARE------ \\
app.use(globalMiddleware);
//---SERVER----------------------------- \\
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App runing on port:${PORT}`);
});
//---HANDLE-REJECTION-OUTSIDE-EXPRESS------------------- \\
process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);
  });
});
