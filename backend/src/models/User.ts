import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password?: string;
  role: 'client' | 'admin';
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['client', 'admin'], default: 'client' }
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
