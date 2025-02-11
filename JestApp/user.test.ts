import prisma from '@/prisma/client';
import { createUser, getUserById, getUsers } from '@/src/app/controllers/UserControllers';
import { Context } from 'hono';
import { json } from 'stream/consumers';

describe('UserController test', () => {

    test('getUsers test', async () => {
        const getUsersTest = {
            json: jest.fn(),
        } as unknown as Context;

        const users = await prisma.users.findMany();

        await getUsers(getUsersTest);

        expect(getUsersTest.json).toHaveBeenCalledWith(users);
    });

    test('createUser test', async () => {
        const createTest = {
            req: {
                json: jest.fn().mockResolvedValue({
                    username: 'user test',
                    name: 'nama user test',
                    address: 'alamat test',
                    phone: '0000000000'
                })
            },
            json: jest.fn()
        } as unknown as Context;

        const newUser = {
            username: 'user test',
            name: 'nama user test',
            address: 'alamat test',
<<<<<<< HEAD
            phone: '0000000000',
=======
            phone: '080808080808',
>>>>>>> 30934500f336b814d4a00744f2f6f33b4f05e9a8
        };

        prisma.users.create = jest.fn().mockResolvedValue(newUser);

        await createUser(createTest);

        expect(createTest.json).toHaveBeenCalledWith(newUser);
    });

    test('getUserById test', async () => {
        const getUserByIdTest = {
            req: {
                param: jest.fn().mockReturnValue('1')
            },
            json: jest.fn()
        } as unknown as Context;

        const users = await prisma.users.findUnique({
            where: { id: 1 },
        });

        await getUserById(getUserByIdTest);

        expect(getUserByIdTest.json).toHaveBeenCalledWith(users)
    });
})