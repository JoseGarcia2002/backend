require("dotenv").config()
const express = require('express')
const cors = require('cors')
const Note = require("./models/note")

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static("build"))

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0

    return maxId + 1
}

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

app.route("/api/notes")
    .get((req, res) => {
        Note.find({}).then(notes => {
            res.json(notes)
        })
    })
    .post((req, res) => {
        const body = req.body

        if (!body.content) {
            return res.status(400).json({
                error: "content missing"
            })
        }

        const note = new Note({
            content: body.content, 
            important: body.important || false, 
            date: new Date(), 
            id: generateId()
        })

        note.save().then(savedNote => {
            res.json(savedNote)
        })
    })

app.route("/api/notes/:id")
    .get((req, res) => {
        const id = req.params.id 

        Note.findById(id)
            .then(note => {
                if (note) {
                    res.json(note)
                }
                else {
                    res.status(404).end()
                }
            })
            .catch(err => {
                console.log(err)
                res.status(400).send({error:"malformatted id"})
            })
    })
    .delete((req, res) => {
        const id = Number(req.params.id)
        notes = notes.filter(note => note.id !== id)

        res.status(204).end()
    })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})