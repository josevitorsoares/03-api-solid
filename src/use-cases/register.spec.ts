import { describe, expect, it } from "vitest";
import { compare } from "bcryptjs";

import { RegisterUseCase } from "./register";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

describe("Register Use Case", () => {
    it("shold be hable to register", async () => {
        const userRepository = new InMemoryUsersRepository();
        const registerUseCase = new RegisterUseCase(userRepository);

        const { user } = await registerUseCase.execute({
            name: "John Due",
            email: "johndue@email.com",
            password: "123456"
        });

        expect(user.id).toEqual(expect.any(String));
    });

    it("shold hash user password upon registration", async () => {
        const usersRepository = new InMemoryUsersRepository();
        const registerUseCase = new RegisterUseCase(usersRepository);

        const { user } = await registerUseCase.execute({
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
        const usersRepository = new InMemoryUsersRepository();
        const registerUseCase = new RegisterUseCase(usersRepository);

        const email = "johndue@email.com";

        await registerUseCase.execute({
            name: "John Due",
            email,
            password: "123456"
        });

        await expect(() =>
            registerUseCase.execute({
                name: "John Due",
                email,
                password: "123456"
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError);
    });
});