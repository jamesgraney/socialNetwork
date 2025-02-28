import { Schema, model, Document } from 'mongoose';

// create the interface
interface IUser extends Document {
  name: string;
  email: string;
  thoughts?: string[]
  friends?: string[]
}

// Create the schema
const userSchema = new Schema<IUser>({
  name: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  thoughts: [{type: Schema.Types.ObjectId, ref: 'thoughts'}],
  friends: [{type: User, ref: 'user'}]
})

// Mongoose Model to create the model.
const User = model ('user', userSchema);

export default User