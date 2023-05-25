import Post from '../models/post_model';

export async function createPost(postFields, uID) {
  const post = new Post();
  post.author = uID;
  post.title = postFields.title;
  post.tags = postFields.tags;
  post.content = postFields.content;
  post.coverUrl = postFields.coverUrl;
  try {
    const result = await post.save();
    return result;
  } catch (error) {
    throw new Error(`create post error: ${error}`);
  }
}
export async function getPosts() {
  try {
    const result = await Post.find();
    return result;
  } catch (error) {
    throw new Error(`get post error: ${error}`);
  }
}
export async function getPost(id) {
  try {
    const result = await Post.findById(id);
    return result;
  } catch (error) {
    throw new Error(`get id post error: ${error}`);
  }
}
export async function deletePost(id) {
  try {
    const result = await Post.findByIdAndRemove(id);
    return result;
  } catch (error) {
    throw new Error(`delete post error: ${error}`);
  }
}
export async function updatePost(id, postFields) {
  try {
    const result = await Post.findOneAndUpdate({ _id: id }, postFields, { new: true });
    return result;
  } catch (error) {
    throw new Error(`put post error: ${error}`);
  }
}
