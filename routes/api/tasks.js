const { Router } = require("express")
const Task = require("../../models/Task")

const router = Router()

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find()
    if (!tasks) throw new Error("No tasks")
    const sorted = tasks.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    })
    res.status(200).json(sorted)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post("/", async (req, res) => {
  const newTask = new Task(req.body)
  try {
    const task = await newTask.save()
    if (!task)
      throw new Error("Something went wrong saving the task")
    res.status(200).json(task)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.put("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const response = await Task.findByIdAndUpdate(id, req.body)
    if (!response) throw Error("Something went wrong ")
    const updated = { ...response._doc, ...req.body }
    res.status(200).json(updated)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const removed = await Task.findByIdAndDelete(id)
    if (!removed) throw Error("Something went wrong ")
    res.status(200).json(removed)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
