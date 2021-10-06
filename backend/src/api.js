const express = require('express');
const { ObjectID } = require('mongodb');
const database = require('./database');
const { requestLogger, validator } = require('./middlewares');

const app = express();
const Todos = database.client.db('todos').collection('todos');
const numOfItemsPerPage = 20;

app.use(require('cors')());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(requestLogger);
app.use(validator);

app.get('/', async (req, res) => {
  const cursor = parseInt(req.query.cursor);
  const data = await Todos.find().skip(cursor * numOfItemsPerPage).limit(numOfItemsPerPage).toArray();

  const todosCount = await Todos.countDocuments();
  const pagesCount = todosCount / numOfItemsPerPage;
  const nextPage = (cursor <= pagesCount) ? cursor + 1 : null;

  res.status(200).json({ nextPage, data });
});

app.post('/', async (req, res) => {
  const { text } = req.body;

  const todo = { text, completed: false };
  await Todos.insertOne(todo);

  res.status(201).json(todo);
});

app.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  console.log('id', id)
  console.log('completed', completed)
  await Todos.updateOne({ _id: ObjectID(id) }, { $set: { completed } });

  res.status(200).end();
});

app.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Todos.deleteOne({ _id: ObjectID(id) });

  res.status(203).end();
});

module.exports = app;
