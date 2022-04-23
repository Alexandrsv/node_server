import express from "express";

const port = 8000;
const app = express();

app.all(/.*/, (req, res, next) => {
  console.log("ALL HERE");
  next();
});

app
  .route("/hi")
  .get((req, res) => {
    res.cookie("token", "12345РАДОСТЬ!", {
      path: "/",
      // httpOnly: true,
      secure: true,
      // sameSite: "strict",
    });
    res.append("Bip", "bop bop bop");
    res.type("application/json");
    res.location("");
    res.links({
      next: "http://localhost:8000/hi",
      last: "http://localhost:8000/hi",
    });
    res.status(202).json({ message: "Да что ты?", list: [1, 2, 3, 5, 6] });
  })
  .post((req, res) => {
    res.set("Content-Type", "text/plain");
    res.clearCookie("token");
    res.send("Да что ты?");
  });

app.get("/download", (req, res) => {
  res.download("./index.js", "src.js");
});

app.get("/redirect", (req, res) => {
  res.redirect(301, "/hi");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
