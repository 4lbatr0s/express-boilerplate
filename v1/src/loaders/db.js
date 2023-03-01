import Mongoose from "mongoose";

const db = Mongoose.connection;

db.once("open", ()=>{
    console.log("Successfully connected to mongodb");
})


const connectDB =  async () => {
    await Mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
        useNewUrlParser:true, //tells mongoose to use the latest url parser.
        useUnifiedTopology:true //tells mongoose to use the newest server discovery and monitoring engine
    });     
}

export {connectDB,} 