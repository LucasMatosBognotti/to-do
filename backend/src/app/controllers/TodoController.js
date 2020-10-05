import Todo from '../models/Todo';

class TodoController {
  async store(req, res) {
    
    const todo = await Todo.create(req.body);

    return res.json(todo);
  }

  async index(req, res) {
    const todos = await Todo.find();

    return res.json(todos);
  }

  async show(req, res) {
    const { id } = req.params;

    const todo = await Todo.findOne({ _id: id });

    return res.json(todo);
  }

  async update(req, res) {
    const { id } = req.params;

    const todo = await Todo.findByIdAndUpdate({ _id: id }, req.body, { new: true } );

    return res.json(todo);
  }

  async delete(req, res) {
    const { id } = req.params;
    await Todo.deleteOne({_id: id});

    return res.json({ message: 'Deleted with suce' });
  }
}

export default new TodoController();
