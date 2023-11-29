import { Prisma, Users } from "@prisma/client";
import { UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository {
    public items: Users[] = [];
    
    
    async create(data: Prisma.UsersCreateInput) {
        const user = {
            id: "user-1",
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            created_at: new Date()
        };
        
        this.items.push(user);
        
        return user;
    }
    async findByEmail(email: string) {
        const user = this.items.find((item) => item.email === email);

        if (!user) {
            return null;
        }
        
        return user;
    }
    async findById(id: string): Promise<{ id: string; name: string; email: string; password_hash: string; created_at: Date; } | null> {
        const user = this.items.find((item) => item.id === id);

        if (!user) {
            return null;
        }

        return user;
    }

}