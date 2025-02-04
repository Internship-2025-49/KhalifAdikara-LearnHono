import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

import books from './books'
import authors from './authors'
import exp from 'constants'

export const runtime = 'edge'

const app = new Hono().basePath('/api')

const routes = app.route('/authors', authors).route('/books', books)

export const GET = handle(app)
export const POST = handle(app)

export type AppType = typeof routes