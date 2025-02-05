import prisma from '@/prisma/client'
import { Context } from 'hono'

export const getPosts = async (c: Context) => {
    try {
        const posts = await prisma.post.findMany({ orderBy: { id: 'desc' } });

        return c.json({
            success: true,
            message: 'List Data Posts!',
            data: posts
        }, 200);

    } catch (e: unknown) {
        console.error(`Error getting posts: ${e}`);
    }
}