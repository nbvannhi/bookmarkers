const express = require('express')
const app = express()

app.get('/api', (req, res) => {
  res.json({"users": ["userOne", "userTwo", "userThree", "userFour"]})
})

app.listen(8000, () => {
  console.log("book-service listening on port 8000")
})
