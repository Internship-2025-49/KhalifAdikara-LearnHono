import { Hono } from 'hono'
import { html } from 'hono/html'
import { basicAuth } from 'hono/basic-auth'

const app = new Hono()

app.get('/html/:username', (c) => {
    const { username } = c.req.param()
    return c.html(
        html`<!doctype html>
            <body>
                <h1>Hello ${username}!</h1>
            </body>
        `
    )
})

app.get('/text', (c) => {
    return c.text('Hello Hono!')
})

app.get('/page/:id', (c) => {
    const page = c.req.query('page')
    const id = c.req.param('id')
    c.header('X-Message', 'Hi!')
    return c.text(`You want to see ${page} of ${id}`)
})

app.get('/response', () => {
    return new Response('Good morning!')
})

app.use(
    '/admin/*',
    basicAuth({
        username: 'admin',
        password: 'secret',
    })
)

// buat test = http://admin:secret@localhost:3000/api/test/admin/
app.get('/admin', (c) => {
    return c.text('You are authorized!')
})

export default app

