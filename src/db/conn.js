const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://Hotel:Hotel@cluster0.qqo0way.mongodb.net/Retvens",{
    //useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connection is successful");
}).catch((e) => {
    console.log("No connection");
})