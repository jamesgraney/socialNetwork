import { Schema } from "mongoose";

interface IThought extends Document {
    thoughtText: string,
    createdAt: Date,
    username: String,
    reactions: IReaction[];
};

// should be a subdocument
interface IReaction extends Document {
    reactionId: mongoose.Types.ObjectId,
    reactionBody: string, 
    username: string,
    createdAt: Date;
}
const thoughtSchema = new Schema<IThought>({
    thought: { type: String, required: true, minLength: 1, maxLength: 280},
    // TODO: getter method required for createdAt. Unclear exactly what is meant by this.
    createdAt: {type: Date, default: Date.now },
    username: { type: String, required: true},
    reactions: [reactionSchema]
})

const reactionSchema = new Schema<IReaction>({
    reactionId: {type: String, default: new mongoose.Types.ObjectId()},
    reactionBody: {type: String, required: true, maxlength: 280},
    username: {type: String, required: true},
        // TODO: getter method required for createdAt. Unclear exactly what is meant by this.
    createdAt: {type: Date, default: Date.now },
});

const Thought = mongoose.model<IThought>('Thought', thoughtSchema);

export default Thought;