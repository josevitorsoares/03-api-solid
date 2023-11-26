import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "../authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./invalid-credentials-error";

describe("Authenticate Use Case", () => {
    it("shold be able to authenticate", async () => {
        const usersRepository = new InMemoryUsersRepository();
        const sut = new AuthenticateUseCase(usersRepository);
        //sut - system under test

        await usersRepository.create({
            name: "John Due",
            email: "johndue@email.com",
            password_hash: await hash("123456", 6)
        });

        const { user } = await sut.execute({
            email: "johndue@email.com",
            password: "123456"
        });

        expect(user.id).toEqual(expect.any(String));
    });

    it("shold not be able to authenticate with worng email", async () => {
        const usersRepository = new InMemoryUsersRepository();
        const sut = new AuthenticateUseCase(usersRepository);
        //sut - system under test

        expect(() => 
            sut.execute({
                email: "johndue@email.com",
                password: "123456"
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });

    it("shold be not able to authenticate whith wrong password", async () => {
        const usersRepository = new InMemoryUsersRepository();
        const sut = new AuthenticateUseCase(usersRepository);
        //sut - system under test

        await usersRepository.create({
            name: "John Due",
            email: "johndue@email.com",
            password_hash: await hash("123456", 6)
        });

        expect(() => 
            sut.execute({
                email: "johndue@email.com",
                password: "123123"
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });
});