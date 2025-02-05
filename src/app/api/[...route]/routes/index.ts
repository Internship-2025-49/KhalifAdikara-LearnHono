//import hono

import { Hono } from 'hono';
import { getPosts, createPost, getPostById } from '../../../controllers/PostControllers';

const app = new Hono()

app.get('/', (c) => getPosts(c));

app.post('/', (c) => createPost(c));

app.get('/:id', (c) => getPostById(c));

export const Routes = app;