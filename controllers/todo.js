const Todo = require('../models/Todo');

exports.addItem = async (req, res) => {
    const { content } = req.body;

    const todoItem = new Todo({
        content,
        userId: req.user.id
    });

    try {
        await todoItem.save();

        res.status(200).json({ todoItem })
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
}

exports.updateItem = async (req, res) => {
    const { content } = req.body;

    const todoFields = {
        content
    }

    try {
        const item = await Todo.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ msg: 'Item does not exist' });
        }

        if (item.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Todo.findByIdAndUpdate(req.params.id, {
            $set: todoFields
        });

        const updatedItem = await Todo.findById(req.params.id);
    
        res.status(200).json({ updatedItem });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
}

exports.deleteItem = async (req, res) => {
    try {
        const item = await Todo.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ msg: 'Item does not exist' });
        }

        if (item.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Todo.findByIdAndRemove(req.params.id);
        res.status(200).json({ msg: 'Item removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
}

exports.getItems = async (req, res) => {
    try {
        const items = await Todo.find({ userId: req.user.id });
        res.status(200).json({ items });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
}