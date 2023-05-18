import mongoose, { Schema } from 'mongoose';

// create PostModel class from schema
const Post = new Schema({

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
