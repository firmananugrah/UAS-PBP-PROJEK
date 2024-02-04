import {prismaClient} from "../src/application/database.js";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            username: "test"
        }
    })
}

export const createTestUser = async () => {
    await prismaClient.user.create({
        data: {
            username: "test",
            password: await bcrypt.hash("rahasia", 10),
            name: "test",
            token: "test"
        }
    })
}

export const getTestUser = async () => {
    return prismaClient.user.findUnique({
        where: {
            username: "test"
        }
    });
}

export const removeAllTestMakanans = async () => {
    await prismaClient.makanan.deleteMany({
        where: {
            username: 'test'
        }
    });
}

export const createTestMakanan = async () => {
    await prismaClient.makanan.create({
        data: {
            username: "test",
            makanan: "test",
            minuman: "test",
            paket_murah: "test",
            aneka_salad: "test",
            jumlah: "test",
            harga: "test"
        }
    })
}

export const createManyTestMakanans = async () => {
    for (let i = 0; i < 15; i++) {
        await prismaClient.makanan.create({
            data: {
                username: `test`,
                makanan: `test ${i}`,
                minuman: `test ${i}`,
                paket_murah: `test ${i}`,
                aneka_salad: `test${i}`,
                jumlah: `test${i}`,
                harga: `test${i}`
            }
        })
    }
}

export const getTestMakanan = async () => {
    return prismaClient.makanan.findFirst({
        where: {
            username: 'test'
        }
    })
}