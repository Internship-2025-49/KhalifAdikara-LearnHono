//import hono

import { Hono } from 'hono';
import { getPosts, createPost } from '../../../controllers/PostControllers';

const app = new Hono()

app.get('/', (c) => getPosts(c));

app.post('/', (c) => createPost(c));

export const Routes = app;