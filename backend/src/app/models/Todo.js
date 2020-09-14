import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  who: {
    type: String,
    required: true
  },
  where: {
    type: String,
    required: true
  },
  priority: {
    type: Number,
    required: true
  },
  done: {
    type: Boolean,
    required: true,
    default: false
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

export default mongoose.model('Todo', TodoSchema);
