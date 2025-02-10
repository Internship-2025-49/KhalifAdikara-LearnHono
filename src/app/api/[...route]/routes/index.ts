import { Hono } from 'hono'
import { getPosts, createPost, getPostById, updatePost, deletePost } from '../../../controllers/PostControllers'
import { jwt } from 'hono/jwt'
import type { JwtVariables } from 'hono/jwt'
import { apiKeyAuth } from '../../../middleware/Auth'
import prisma from '@/prisma/client'

type Variables = JwtVariables

const app = new Hono<{ Variables: Variables }>()

app.use('/*',jwt(
    {
      secret: 'a96206a191559dec12923aff2fc8bab9881929a1dfd33a3ce2647eb1ab4dbe23',
    }
  )
)

app.get('/', async (c) => {
  const auth = await prisma.auth.findFirst()

  if (auth) {
      return c.json(
          { 
              statusCode: 200, 
              message: 'Authorized',
              key: auth.key 
          }
      )
  }
})


app.use('*', apiKeyAuth)

app.get('/data', (c) => getPosts(c))

app.post('/data', (c) => createPost(c))

app.get('/data/:id', (c) => getPostById(c))

app.put('/data/:id', (c) => updatePost(c))

app.delete('/data/:id', (c) => deletePost(c))

export const Routes = app