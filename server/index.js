const express = require('express')
const Routes = require('./routes/Routes')

const app = express()


// Support posting form data with URL encoded
app.use("/", Routes)



const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log("Server is running on port 3000")
})