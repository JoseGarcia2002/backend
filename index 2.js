const { response } = require('express')
const express = require('express')
const app = express()

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2022-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2022-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2022-05-30T19:20:14.298Z",
      important: true
    }
]

app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>")
})

app.get("/api/notes", (req, res) => {
    res.json(notes)
})

app.route("/api/notes/:id")
    .get((req, res) => {
        const id = req.params.id 
        const note = notes.find(note => note.id == id)

        if (note) {
            res.json(note)
        }
        else {
            res.status(404).end()
        }
    })
    .delete((req, res) => {
        const id = Number(req.params.id)
        notes = notes.filter(note => note.id !== id)

        res.status(204).end()
    })

const PORT = 3000 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})