const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        rel: 'users',
    },
    content: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('todos', TodoSchema);