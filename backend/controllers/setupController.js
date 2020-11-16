const Todo = require("../models/Todo");

module.exports = function (app) {
  app.get("/setup/Todos", (req, res) => {
    // seed database
    const starterTodos = [
      {
        todo: "Buy grocery",
        isDone: false,
      },
      {
        todo: "Feed dog",
        isDone: false,
      },
      {
        todo: "Learn Node",
        isDone: false,
      },
    ];

    Todo.create(starterTodos, (err, results) => {
      res.send(results);
    });
  });
};
