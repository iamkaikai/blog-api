import { Router } from 'express';
import * as Posts from './controllers/post_controller';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our blog api!' });
});

router.get('/posts', async (req, res) => {
  try {
    const result = await Posts.getPosts();
    return res.json(result);
  } catch (error) {
    return res.status(420).json({ error: error.message });
  }
});

router.post('/posts', async (req, res) => {
  try {
    const result = await Posts.createPost(req.body);
    console.log('completed save');
    console.log(result);
    return res.json(result);
  } catch (error) {
    return res.status(419).json({ error: error.message });
  }
});

router.put('/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Posts.updatePost({ _id: id }, req.body);
    if (result == null) {
      throw new Error('Post not found');
    }
    return res.json(result);
  } catch (error) {
    return res.status(420).json({ error: error.message });
  }
});

router.get('/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Posts.getPost(id);
    if (result == null) {
      throw new Error('Post not found');
    }
    return res.json(result);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

router.delete('/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Posts.deletePost(id);
    if (result == null) {
      throw new Error('Post not found');
    }
    return res.json(result);
  } catch (error) {
    return res.status(420).json({ error: error.message });
  }
});

router.patch('/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Posts.updatePost(id, req.body);
    if (result == null) {
      throw new Error('Post not found');
    }
    return res.json(result);
  } catch (error) {
    return res.status(420).json({ error: error.message });
  }
});

export default router;
