import Mongoose from "mongoose";
import logger from "../scripts/logger/Projects.js";

const ProjectSchema = new Mongoose.Schema({
    name:String,
    user_id:{  //TIP: How to reference a foreign key!
        type:Mongoose.Types.ObjectId,
        ref:"user"
    }
}, {timestamps:true, versionKey:false})

//INFO: Mongoose hooks: they're middlewares.
// ProjectSchema.pre('save', (next,doc)=>{
//     console.log("Pre save docs:", doc); //instead of doc, you can se this, this indicates the document that's being saved.
//     next();
// });

//TIP: after saving to the db.
ProjectSchema.post('save', (doc,next)=>{
    logger.log({
        level: 'info',
        message:doc
    })
    next(); //if you don't use next here, your pipeline will be terminated
})

export default Mongoose.model("project", ProjectSchema);