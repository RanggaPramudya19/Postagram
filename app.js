const express = require("express");
const session = require("express-session");

const app = express();
const port = process.env.PORT || 3000;

// Import Routes
const routes = require("./routes");

// View Engine
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static Folder (CSS, JS, Images)
app.use(express.static("public"));

// Session
app.use(
  session({
    secret: "postagram-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
    },
  })
);

// Routes
app.use("/", routes);

// 404 Handler
app.use((req, res) => {
  res.status(404).send("404 | Page Not Found");
});

// Error Handler
app.use((err, req, res, next) => {
  console.log(err);

  res.status(err.status || 500).send(err.message || "Internal Server Error");
});

// Server
app.listen(port, () => {
  console.log(`Postagram running on http://localhost:${port}`);
});