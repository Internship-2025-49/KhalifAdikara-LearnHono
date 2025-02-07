import { Hono } from 'hono'
import { handle } from 'hono/vercel'

import books from './routes/books'
import authors from './routes/authors'
import test from './routes/test'
import { Routes } from './routes'
import { Users } from './routes/users'

export const runtime = 'nodejs'

const app = new Hono().basePath('/api')


app.route('/authors', authors)
app.route('/books', books)
app.route('/test', test)
app.route('/posts', Routes)
app.route('/users', Users)

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app) 
export const DELETE = handle(app)

export type AppType = typeof app