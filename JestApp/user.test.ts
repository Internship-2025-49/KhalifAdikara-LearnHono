import prisma from '@/prisma/client';
import { createUser, getUsers } from '@/src/app/controllers/UserControllers';
import { Context } from 'hono';

describe('UserController test', () => {

    test('getUsers test', async () => {
        const getTest = {
            json: jest.fn(),
        } as unknown as Context;

        const users = await prisma.users.findMany();

        await getUsers(getTest);

        expect(getTest.json).toHaveBeenCalledWith(users);
    });

    test('createUser test', async () => {
        const createTest = {
            req: {
                json: jest.fn().mockResolvedValue({
                    username: 'user test',
                    name: 'nama user test',
                    address: 'alamat test',
                    phone: '080808080808'
                })
            },
            json: jest.fn()
        } as unknown as Context;

        const newUser = {
            id: 1,
            username: 'user test',
            name: 'nama user test',
            address: 'alamat test',
            phone: '080808080808'
        };

        prisma.users.create = jest.fn().mockResolvedValue(newUser);

        await createUser(createTest);

        expect(createTest.json).toHaveBeenCalledWith(newUser);
    });
})