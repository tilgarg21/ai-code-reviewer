const express = require("express");

const cors = require("cors");

const aiRoutes = require("./routes/ai.route");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res)=> {
    res.send("Hello World");
})

app.use("/ai", aiRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});


module.exports = app;