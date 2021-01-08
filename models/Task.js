const { Schema, model } = require('mongoose')

const TaskSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Task = model('task', TaskSchema)

module.exports = Task