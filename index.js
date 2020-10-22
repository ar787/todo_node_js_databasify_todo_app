const path = require("path")
const express = require("express")
const router = require("./routes/route")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const jsonParser = bodyParser.json()
                 require('dotenv').config()
const app = express()

app.use("/",express.static( path.join(__dirname, "public")))

app.use(jsonParser)

app.use("/api/todos", router)

async function start() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.USER_PASSWORD}:${process.env.PASSWORD}@cluster0.dlaiz.mongodb.net/Todo?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        app.listen(process.env.PORT)
    } catch(err) {
        console.log(err)
    }
}

start()