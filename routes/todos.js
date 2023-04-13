var express = require('express');
var router = express.Router();
var createError = require('http-errors');

const todos = [
    {
        id: 1,
        name: 'First Task',
        completed: false
    }
];

/** Get all Todos */
router.get('/', function(req, res, next) {
  res.json(todos);
});

/** Get one Todo */
router.get('/:id', function(req, res, next) {
    // res.json(todos[0])   #my scratch testing

    /** For unit test 2 */
    // const todo  = todos.find(todo => todo.id === Number(req.params.id));
    // res.json(todo);

    /** For (combined) unit tests 2 and 3 */
    const todo  = todos.find(todo => todo.id === Number(req.params.id));

    if (!todo) {
        return next(createError(404, 'Not Found'))
    }
    res.json(todo);
});

/** Create Todo */
router.post('/', function(req, res, next) {
    const { body } = req;

    /** For unit test 5 */
    if (typeof body.name !== 'string'){
        return next(createError(422, 'Validation error!'))
    };

    /** For unit test 4 */
    const newTodo = {
        id: todos.length + 1,
        name: body.name,
        completed: false
    };

    todos.push(newTodo);

    // res.json(newTodo);

    // since test expects status '201'
    res.status(201).json(newTodo);
});

module.exports = router;
