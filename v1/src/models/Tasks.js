import Mongoose from 'mongoose';
import logger from '../scripts/logger/Tasks.js';

const TaskSchema = new Mongoose.Schema(
    {
        title: String,
        description: String,
        assigned_to: {
            type: Mongoose.Types.ObjectId,
            ref: 'user',
        },
        user_id: {
            type: Mongoose.Types.ObjectId,
            ref: 'user',
        },
        project_id: {
            type: Mongoose.Types.ObjectId,
            ref: 'project',
        },
        section_id: {
            type: Mongoose.Types.ObjectId,
            ref: 'section',
        },
        due_date: Date,
        statuses: [String],
        order: Number,
        isCompleted: Boolean,
        comments: [ //INFO: HOW TO CREATE NESTED MONGO DB OBJECT LISTS.
            {
                comment: String,
                commented_at: Date,
                user_id: {
                    type: Mongoose.Types.ObjectId,
                    ref: 'user',
                },
            },
        ],
        media: [String],
        sub_tasks:[{ //INFO: HOW TO CREATE SELF REFERENCED PROPERTY!, (LIKE MENTION TWEETS)
            type:Mongoose.Types.ObjectId,
            ref:"task"
        }]
    },
    { timestamps: true, versionKey: false }
);

TaskSchema.post('save', (doc) => {
    logger.log({
        level: 'info',
        message: doc,
    });
});

export default Mongoose.model('task', TaskSchema);
