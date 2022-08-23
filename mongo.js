const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log("Please provide the password as an argument")
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://josegarcia2002:${password}@cluster0.3mssxqs.mongodb.net/noteApp?retryWrites=true&w=majority`

const noteSchema = new mongoose.Schema({
    content: String, 
    date: Date, 
    important: Boolean
})

const Note = mongoose.model("Note", noteSchema)

// mongoose
//     .connect(url)
//     .then(result => {
//         // console.log("connected")

//         // const note = new Note({
//         //     content: "Mongoose makes use of mongo easy.",
//         //     date: new Date(),
//         //     important: true
//         // })

//         // const note1 = new Note({
//         //     content: "Callback-functions suck",
//         //     date: new Date(),
//         //     important: true
//         // })

//         // note1.save()
//         // return note.save()
//     })
//     .then(() => {
//         return mongoose.connection.close()
//     })
//     .catch(error => console.log(error))

mongoose.connect(url)

Note.find({}).then(results => {
    results.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})