import express from "express";

const port = 8000;
const app = express();

app.all(/.*/, (req, res, next) => {
  console.log("ALL HERE");
  next();
});

const cb1 = (req, res, next) => {
  console.log("CB1");
  next();
};

const cb2 = (req, res, next) => {
  console.log("CB2");
  next();
};

app
  .route("/user")
  .get((req, res) => {
    res.send("Да что ты?");
  })
  .post((req, res) => {
    res.send("Да что ты?");
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
