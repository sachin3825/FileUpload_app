// app create
const express = require("express");
const app = express();

// port find
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// middleware add
app.use(express.json());
const fileUpload = require("express-fileupload");
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/",
  })
);

// db connect
const db = require("./Config/Database");
db.connect();

// cloud connect
const cloudinary = require("./Config/Cloudinary");
cloudinary.cloudinaryConnect();

// api route mount
const Upload = require("./Routes/FileUpload");
app.use("/api/v1/upload", Upload);

// active server
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
