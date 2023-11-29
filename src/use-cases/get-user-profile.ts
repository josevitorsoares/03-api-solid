import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { Users } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetUserProfileUseCaseRequest {
    userId: string;
}

interface GetUserProfileUseCaseResponse {
    user: Users
}

export class GetUserProfileUseCase {
    constructor(
        private usersRepository = new InMemoryUsersRepository()
    ) { }

    async execute({ userId }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
        const user = await this.usersRepository.findById(userId);

        if (!user) {
            throw new ResourceNotFoundError();
        }

        return { user };
    }
}