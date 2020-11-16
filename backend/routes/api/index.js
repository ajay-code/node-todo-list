const express = require("express");
const router = express.Router();
const todosApi = require("./todos");
router.get("/", (req, res) => {
  res.json({
    msg: "This is the api",
  });
});

router.use(todosApi);

module.exports = router;
