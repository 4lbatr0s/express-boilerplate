import Mongoose from "mongoose";
import logger from "../scripts/logger/Sections.js";

const SectionSechema = new Mongoose.Schema({
    name:String,
    user_id:{  //TIP: How to reference a foreign key!
        type:Mongoose.Types.ObjectId,
        ref:"user"
    },
    project_id:{
        type:Mongoose.Types.ObjectId,
        ref:"project"
    },
    tasks:[
        {
            type:Mongoose.Types.ObjectId,
            ref:"task"
        }
    ],
    order:Number

}, {timestamps:true, versionKey:false})

SectionSechema.post('save', (doc)=>{
    logger.log({
        level: 'info',
        message:doc
    });
});

export default Mongoose.model("section", SectionSechema);