require("dotenv").config();
const cors = require("cors");
const express = require("express");

const app = express();
const authRouter = require("./router/auth_router");
const contactRouter = require("./router/contact_router");
const serviceRouter = require("./router/service_router");
const adminRouter = require("./router/admin_router");
const connectdb = require("./utils/db");
const errorMiddleware = require("./middlewares/errorMiddleware");

// ✅ Correct CORS options
const corsOption = {
  origin: "http://localhost:5173",
  methods: "GET,PUT,POST,DELETE,PATCH,HEAD",
  credentials: true
};

app.use(cors(corsOption));
app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRouter);
app.use("/api/contact", contactRouter); // ✔️ Correct path for contact
app.use("/api/service", serviceRouter);
app.use("/api/admin", adminRouter)
app.get("/", (req, res)=>{
  res.send({
    activeStatus:true,
    error: false
  })
})

// ✅ Error Middleware
app.use(errorMiddleware);

const PORT = process.env.PORT;

connectdb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
