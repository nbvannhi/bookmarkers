import express from 'express'
import { getPublishers, getPublisher, createPublisher } from './database.js'

const app = express()

app.use(express.json())

app.get('/publishers', async (req, res) => {
  const publishers = await getPublishers()
  res.send(publishers)
  // res.json({"users": ["userOne", "userTwo", "userThree", "userFour"]})
})

app.get('/publishers/:publisher_id', async (req, res) => {
  const id = req.params.publisher_id
  const publisher = await getPublisher(id)
  res.send(publisher)
})

app.post('/publishers', async (req, res) => {
  const { name } = req.body
  const publisher = await createPublisher(name)
  res.status(201).send(publisher)
})

app.listen(8000, () => {
  console.log("book-service listening on port 8000")
})
