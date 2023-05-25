import { Router } from 'express';
import * as Posts from './controllers/post_controller';
import * as UserController from './controllers/user_controller';
import { requireAuth, requireSignin } from './services/passport';

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

router.post('/posts', requireAuth, async (req, res) => {
  try {
    console.log(req);
    const result = await Posts.createPost(req.body, req.user._id);
    return res.json(result);
  } catch (error) {
    return res.status(419).json({ error: error.message });
  }
});

router.put('/posts/:id', requireAuth, async (req, res) => {
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

router.delete('/posts/:id', requireAuth, async (req, res) => {
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

router.patch('/posts/:id', requireAuth, async (req, res) => {
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

router.post('/signin', requireSignin, async (req, res) => {
  try {
    const token = await UserController.signin(req.user);
    res.json({ token, email: req.user.email });
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const token = await UserController.signup(req.body);
    res.json({ token, email: req.body.email });
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

export default router;
