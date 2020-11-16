const Todo = require("../models/Todo");

// get all the todos
exports.getAllTodos = (req, res) => {
  Todo.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      throw err;
    });
};

// get all active the todos
exports.getActiveTodos = (req, res) => {
  Todo.find({ isDone: false })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      throw err;
    });
};

// get all completed the todos
exports.getCompletedTodos = (req, res) => {
  Todo.find({ isDone: true })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      throw err;
    });
};

// get todo by id
exports.getTodoById = (req, res) => {
  Todo.findById({ _id: req.params.id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({
        msg: "this task do not exist",
      });
      throw err;
    });
};

// add todo
exports.storeTodo = (req, res) => {
  Todo.create({
    todo: req.body.todo,
    isDone: req.body.isDone,
  })
    .then((data) => {
      console.log(data);
      res.json({ success: true });
    })
    .catch((err) => {
      res.json({
        msg: "this request could not be processed",
      });
      throw err;
    });
};

//  update todo by id
exports.updateTodoById = (req, res) => {
  Todo.findByIdAndUpdate(req.params.id, {
    todo: req.body.todo,
    isDone: req.body.isDone,
  })
    .then((data) => {
      res.json({ success: true });
    })
    .catch((err) => {
      throw err;
    });
};

// delete a todo by id
exports.deleteTodoById = (req, res) => {
  Todo.findOneAndDelete({ _id: req.body.id })
    .then((data) => {
      if (data) {
        res.json({ ...data.toJSON(), success: true });
        console.log("Todo deleted: ", data);
      } else {
        res.json({ msg: "todo does not exist in the database" });
      }
    })
    .catch((err) => {
      throw err;
    });
};
