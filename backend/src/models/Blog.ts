import mongoose, { Schema, Document } from 'mongoose';

export interface IBlogComment {
  id: string;
  author: string;
  date: string;
  content: string;
}

export interface IBlog extends Document {
  id: string;
  title: string;
  image: string;
  date: string;
  commentsCount: number;
  summary: string;
  content: string;
  category: string;
  status: 'Draft' | 'Published';
  comments: IBlogComment[];
}

const BlogCommentSchema = new Schema({
  id: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: String, required: true },
  content: { type: String, required: true }
});

const BlogSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  date: { type: String, required: true },
  commentsCount: { type: Number, default: 0 },
  summary: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: String, enum: ['Draft', 'Published'], default: 'Draft' },
  comments: [BlogCommentSchema]
}, { timestamps: true });

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);
