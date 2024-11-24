const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const { connectDb } = require("./connect");

const userRoute = require("./routes/user");
const courseRoute = require("./routes/course");
const adminRoute = require("./routes/admin");

dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", userRoute);
app.use("/api", courseRoute);
app.use("/api", adminRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDb();
});
