import { Hono } from 'hono'

const app = new Hono()
    .get('/', (c) => c.json({
        name: 'John Doe',
        phone: '555-555-5555',
        email: 'test@gmail.com',
        address: '1234 Elm St',
        city: 'Springfield',
        state: 'IL',
        zip: 62701
    }))
    .post('/', (c) => c.json('create an author', 201))
    .get('/:id', (c) => c.json(`get ${c.req.param('id')}`))

export default app