const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://mavericks:mavericks@falseexchange.kf2rmhv.mongodb.net/";

const connectToMongo = async () => {
    mongoose.set("strictQuery", false);
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        if (err) console.log("---", err)
        else {
            console.log("connected");
        }
            })
        }

module.exports = connectToMongo;