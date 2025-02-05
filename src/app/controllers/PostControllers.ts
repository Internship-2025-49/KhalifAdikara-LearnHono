import prisma from '@/prisma/client'
import { Context } from 'hono'

export const getPosts = async (c: Context) => {
    try {
        const posts = await prisma.post.findMany({ orderBy: { id: 'asc' } });

        return c.json({
            success: true,
            message: 'List Data Posts!',
            data: posts
        }, 200);

    } catch (e: unknown) {
        console.error(`Error getting posts: ${e}`);
    }
}

export async function createPost(c: Context) {
    try {

    const body = await c.req.parseBody();

    const title   = typeof body['title'] === 'string' ? body['title'] : '';
    const content = typeof body['content'] === 'string' ? body['content'] : '';

    const post = await prisma.post.create({
        data: {
            title: title,
            content: content,
        }
    });

    return c.json({
        success: true,
        message: 'Post Created Successfully!',
        data: post
    }, 201);

    } catch (e: unknown) {
        console.error(`Error creating post: ${e}`);
    }

}