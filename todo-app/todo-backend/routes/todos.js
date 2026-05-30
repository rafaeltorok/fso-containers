const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const { get, set } = require("../redis/index");

/* GET todos listing. */
router.get('/', async (_, res) => {
  try {
    const todos = await Todo.find({});
    res.send(todos);
  } catch (err) {
    res.send(err);
  }
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  try {
    const todo = await Todo.create({
      text: req.body.text,
      done: false
    })
    const totalTodos = await get("added_todos");
    await set("added_todos", Number(totalTodos) + 1);
    res.send(todo);
  } catch (err) {
    res.send(err);
  }
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  try {
    await req.todo.deleteOne();
    const totalTodos = await get("added_todos");
    await set("added_todos", Number(totalTodos) - 1);
    res.sendStatus(204);
  } catch (err) {
    res.send(err);
  }
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  try {
    if (req.body.text !== undefined) {
      req.todo.text = req.body.text;
    }

    if (req.body.done !== undefined) {
      req.todo.done = req.body.done;
    }

    await req.todo.save();

    res.send(req.todo);
  } catch (err) {
    res.send(err);
  }
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
