import { Hono } from 'hono';
import { getPosts, createPost, getPostById, updatePost, deletePost } from '../../../controllers/PostControllers';

const app = new Hono()

app.get('/', (c) => getPosts(c));

app.post('/', (c) => createPost(c));

app.get('/:id', (c) => getPostById(c));

app.put('/:id', (c) => updatePost(c));

app.delete('/:id', (c) => deletePost(c));

export const Routes = app;