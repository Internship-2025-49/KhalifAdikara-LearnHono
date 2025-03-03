import prisma from '@/prisma/client';
import { createUser, deleteUser, getUserById, getUsers, updateUser } from '@/src/app/controllers/UserControllers';
import { Context } from 'hono';

describe('getUsers test', () => {

    test('getUsers test', async () => {
        const getUsersTest = {
            json: jest.fn(),
        } as unknown as Context;

        const users = await prisma.users.findMany();

        await getUsers(getUsersTest);

        expect(getUsersTest.json).toHaveBeenCalledWith(users);
    });

    test('getUserById test', async () => {
        const userId = 1;
        const getUserByIdTest = {
            req: {
                param: jest.fn().mockReturnValue(userId),
            },
            json: jest.fn(),
        } as unknown as Context;

        const user = await prisma.users.findUnique({
            where: { id: userId },
        });

        await getUserById(getUserByIdTest);

        expect(getUserByIdTest.json).toHaveBeenCalledWith(user);
    });
})

describe('createUser test', () => {
    test('createUser insert all', async () => {
        const createTest = {
            req: {
                json: jest.fn().mockResolvedValue({
                    username: 'user test',
                    name: 'nama user test',
                    address: 'alamat test',
                    phone: '0000000000',
                }),
            },
            json: jest.fn(),
        } as unknown as Context;
    
        const newUserData = {
            username: 'user test',
            name: 'nama user test',
            address: 'alamat test',
            phone: '0000000000',
        };
    
        await createUser(createTest);
    
        expect(createTest.json).toHaveBeenCalledWith(expect.objectContaining(newUserData));
    });

    test('createUser without username', async () => {
        const createTest = {
            req: {
                json: jest.fn().mockResolvedValue({
                    name: 'nama user test',
                    address: 'alamat test',
                    phone: '0000000000',
                }),
            },
            json: jest.fn(),
        } as unknown as Context;
    
        const newUserData = {
            name: 'nama user test',
            address: 'alamat test',
            phone: '0000000000',
        };
    
        await createUser(createTest);
    
        expect(createTest.json).toHaveBeenCalledWith(expect.objectContaining(newUserData));
    });

    test('createUser without name', async () => {
        const createTest = {
            req: {
                json: jest.fn().mockResolvedValue({
                    username: 'user test',
                    address: 'alamat test',
                    phone: '0000000000',
                }),
            },
            json: jest.fn(),
        } as unknown as Context;
    
        const newUserData = {
            username: 'user test',
            address: 'alamat test',
            phone: '0000000000',
        };
    
        await createUser(createTest);
    
        expect(createTest.json).toHaveBeenCalledWith(expect.objectContaining(newUserData));
    });

    test('createUser without address', async () => {
        const createTest = {
            req: {
                json: jest.fn().mockResolvedValue({
                    username: 'user test',
                    name: 'nama user test',
                    phone: '0000000000',
                }),
            },
            json: jest.fn(),
        } as unknown as Context;
    
        const newUserData = {
            username: 'user test',
            name: 'nama user test',
            phone: '0000000000',
        };
    
        await createUser(createTest);
    
        expect(createTest.json).toHaveBeenCalledWith(expect.objectContaining(newUserData));
    });

    test('createUser without phone', async () => {
        const createTest = {
            req: {
                json: jest.fn().mockResolvedValue({
                    username: 'user test',
                    name: 'nama user test',
                    address: 'alamat test',
                }),
            },
            json: jest.fn(),
        } as unknown as Context;
    
        const newUserData = {
            username: 'user test',
            name: 'nama user test',
            address: 'alamat test',
        };
    
        await createUser(createTest);
    
        expect(createTest.json).toHaveBeenCalledWith(expect.objectContaining(newUserData));
    });
})


describe('updateUser describe', () => {
    test('updateUser update all', async () => {
        const userId = 2;
        const updateTest = {
            req: {
                param: jest.fn().mockReturnValue(userId),
                json: jest.fn().mockResolvedValue({
                    username: 'update username',
                    name: 'update name',
                    address: 'update address',
                    phone: '1234567890',
                }),
            },
            json: jest.fn(),
        } as unknown as Context;

        const updatedUserData = {
            username: 'update username',
            name: 'update name',
            address: 'update address',
            phone: '1234567890',
        };

        await updateUser(updateTest);

        expect(updateTest.json).toHaveBeenCalledWith(expect.objectContaining(updatedUserData));
    });

    test('updateUser update username only', async () => {
        const userId = 21;
        const updateTest = {
            req: {
                param: jest.fn().mockReturnValue(userId),
                json: jest.fn().mockResolvedValue({
                    username: 'update username',
                }),
            },
            json: jest.fn(),
        } as unknown as Context;

        const updatedUserData = {
            username: 'update username',
        };

        await updateUser(updateTest);

        expect(updateTest.json).toHaveBeenCalledWith(expect.objectContaining(updatedUserData));
    });

    test('updateUser update name only', async () => {
        const userId = 22;
        const updateTest = {
            req: {
                param: jest.fn().mockReturnValue(userId),
                json: jest.fn().mockResolvedValue({
                    name: 'update name',
                }),
            },
            json: jest.fn(),
        } as unknown as Context;

        const updatedUserData = {
            name: 'update name',
        };

        await updateUser(updateTest);

        expect(updateTest.json).toHaveBeenCalledWith(expect.objectContaining(updatedUserData));
    });

    test('updateUser update address only', async () => {
        const userId = 23;
        const updateTest = {
            req: {
                param: jest.fn().mockReturnValue(userId),
                json: jest.fn().mockResolvedValue({
                    address: 'update address',
                }),
            },
            json: jest.fn(),
        } as unknown as Context;

        const updatedUserData = {
            address: 'update address',
        };

        await updateUser(updateTest);

        expect(updateTest.json).toHaveBeenCalledWith(expect.objectContaining(updatedUserData));
    });

    test('updateUser update phone only', async () => {
        const userId = 24;
        const updateTest = {
            req: {
                param: jest.fn().mockReturnValue(userId),
                json: jest.fn().mockResolvedValue({
                    phone: '1234567890',
                }),
            },
            json: jest.fn(),
        } as unknown as Context;

        const updatedUserData = {
            phone: '1234567890',
        };

        await updateUser(updateTest);

        expect(updateTest.json).toHaveBeenCalledWith(expect.objectContaining(updatedUserData));
    });
})

describe('deleteUser test', () => {
    test('deleteUser id exist', async () => {
        const userId = 21;
        const deleteTest = {
            req: {
                param: jest.fn().mockReturnValue(userId),
            },
            json: jest.fn(),
        } as unknown as Context;

        await deleteUser(deleteTest);

        expect(deleteTest.json).toHaveBeenCalledWith({
            message: 'User Berhasil Dihapus!',
            statusCode: 200,
        }, 200);
    });

    test('deleteUser id doesnt exist', async () => {
        const userId = 15;
        const deleteTest = {
            req: {
                param: jest.fn().mockReturnValue(userId),
            },
            json: jest.fn(),
        } as unknown as Context;

        await deleteUser(deleteTest);

        expect(deleteTest.json).toHaveBeenCalledWith({
            message: 'User Berhasil Dihapus!',
            statusCode: 200,
        }, 200);
    });
})