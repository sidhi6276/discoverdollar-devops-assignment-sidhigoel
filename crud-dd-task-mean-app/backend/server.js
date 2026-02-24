const express = require("express");
const cors = require("cors");

const app = express();

// CORS fix
app.use(cors({
  origin: "*"
}));

// Parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Test application." });
});

require("./app/routes/tutorial.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
