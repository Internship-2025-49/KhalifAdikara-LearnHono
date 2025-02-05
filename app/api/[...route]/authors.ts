import { Hono } from 'hono'
import { html, raw } from 'hono/html'

const app = new Hono()

app.get('/', async (c) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const users = await response.json()
    return c.json(users)
})

app.get('/:id', async (c) => {
    const id = parseInt(c.req.param('id'))
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const users = await response.json()
    const user = users.find((user: { id: number }) => user.id === id)

    return c.json(user)
})

app.post('/', (c) => c.json({ message: 'Create an author' }, 201))

export default app
