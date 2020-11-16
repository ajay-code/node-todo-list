const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  username: String,
  todo: String,
  isDone: Boolean,
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
