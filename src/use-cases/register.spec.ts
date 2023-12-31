import { beforeEach, describe, expect, it } from "vitest";
import { compare } from "bcryptjs";

import { RegisterUseCase } from "./register";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;
//sut - system under test

describe("Register Use Case", () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new RegisterUseCase(usersRepository);
    });

    it("shold be hable to register", async () => {
        const { user } = await sut.execute({
            name: "John Due",
            email: "johndue@email.com",
            password: "123456"
        });

        expect(user.id).toEqual(expect.any(String));
    });

    it("shold hash user password upon registration", async () => {
        const { user } = await sut.execute({
            name: "John Due",
            email: "johndue@email.com",
            password: "123456"
        });

        const isPasswordCorrectlyHashed = await compare(
            "123456",
            user.password_hash
        );

        expect(isPasswordCorrectlyHashed).toBe(true);
    });

    it("shold not be able to register with same email twice", async () => {
        const email = "johndue@email.com";

        await sut.execute({
            name: "John Due",
            email,
            password: "123456"
        });

        await expect(() =>
            sut.execute({
                name: "John Due",
                email,
                password: "123456"
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError);
    });
});