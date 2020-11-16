const express = require("express");
const router = express.Router();
const todoController = require("../../controllers/todoController");
const jsonParser = require("../../middleware/parsers/json");
const urlencoded = require("../../middleware/parsers/urlencoded");
router.get("/todos", todoController.getAllTodos);
router.get("/todos/active", todoController.getActiveTodos);
router.get("/todos/completed", todoController.getCompletedTodos);
router.get("/todo/:id", todoController.getTodoById);
router.post("/todo", jsonParser, todoController.storeTodo);
router.put("/todo/:id", jsonParser, todoController.updateTodoById);
router.delete("/todo", jsonParser, todoController.deleteTodoById);

module.exports = router;
