import { Hono } from 'hono'
import { getUsers, createUser, getUserById, updateUser, deleteUser } from '../../../controllers/UserControllers'
import { jwt } from 'hono/jwt'
import type { JwtVariables } from 'hono/jwt'
import { apiKeyAuth } from '../../../middleware/Auth'
import prisma from '@/prisma/client'

type Variables = JwtVariables

const app = new Hono<{ Variables: Variables }>()

app.use('/*',jwt(
    {
      secret: 'rahasia',
    }
  )
)

app.get('/', async (c) => {
  const auth = await prisma.auth.findFirst()

  if (auth) {
      return c.json(
          { 
              success: true, 
              message: 'Authorized',
              key: auth.key 
          }
      )
  }
})


app.use('*', apiKeyAuth)

app.get('/data', (c) => getUsers(c))

app.post('/data', (c) => createUser(c))

app.get('/data/:id', (c) => getUserById(c))

app.put('/data/:id', (c) => updateUser(c))

app.delete('/data/:id', (c) => deleteUser(c))

export const Users = app