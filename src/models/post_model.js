import mongoose, { Schema } from 'mongoose';

// create PostModel class from schema
const Post = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  tags: String,
  content: String,
  coverUrl: String,

}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

const PostModel = mongoose.model('Post', Post);

export default PostModel;
