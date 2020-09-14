import Todo from '../models/Todo';

class TodoController {
  async store(req, res) {
    
    const todo = await Todo.create(req.body);

    return res.json(todo);
  }

  async index(req, res) {
    const { id} = req.params;

    const todo = await Todo.findOne({
      _id: id
    });

    return res.json(todo);
  }
}

export default new TodoController();
