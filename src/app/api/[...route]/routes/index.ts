//import hono

import { Hono } from 'hono';
import { getPosts } from '../../../controllers/PostControllers';

const app = new Hono()

app.get('/', (c) => getPosts(c));


export const Routes = app;