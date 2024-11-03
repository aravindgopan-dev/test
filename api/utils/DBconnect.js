const mongoose = require("mongoose")


const Connect = () => {
    mongoose.connect("mongodb+srv://aravindgopan:aravindgopan@cluster0.bynzrnk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        .then(() => console.log("connected"))
        .catch((err) => console.log(err))
}


module.exports=Connect