import { Hono } from 'hono'
import { handle } from 'hono/vercel'

import books from './books'
import authors from './authors'
import test from './test'

export const runtime = 'edge'

const app = new Hono().basePath('/api')

const routes = app.route('/authors', authors).route('/books', books).route('/test', test)

export const GET = handle(app)
export const POST = handle(app)

export type AppType = typeof routes